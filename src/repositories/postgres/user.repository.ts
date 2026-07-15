import { Pool, PoolClient } from "pg";
import { User } from "../../models";
import { CreateUserDto } from "../../types";
import { UserRepository } from "../user.repository.interface";
import { UserRow, toUser } from "./mappers/user.mapper";
import { ConflictError } from "../../errors";
import { PgErrorCode } from "../../constants/pg-error-codes";

export function createUserRepository(pool: Pool): UserRepository {
  return {
    async create(input: CreateUserDto, client?: PoolClient): Promise<User> {
      try {
        const { rows } = await (client ?? pool).query<UserRow>(
          `INSERT INTO users (username, phone_number, hashed_password)
       VALUES ($1, $2, $3)
       RETURNING *`,
          [input.username, input.phoneNumber, input.hashedPassword],
        );
        return toUser(rows[0]);
      } catch (err: any) {
        if (err.code === PgErrorCode.UNIQUE_VIOLATION) {
          if (err.constraint?.includes("phone_number")) {
            throw new ConflictError("Phone number already registered");
          }
          if (err.constraint?.includes("username")) {
            throw new ConflictError("Username already taken");
          }
          throw new ConflictError("User already exists");
        }
        throw err;
      }
    },

    async findById(id: string): Promise<User | null> {
      const { rows } = await pool.query<UserRow>(
        `SELECT * FROM users WHERE id = $1`,
        [id],
      );
      return rows[0] ? toUser(rows[0]) : null;
    },

    async findActiveByPhoneNumber(phoneNumber: string): Promise<User | null> {
      const { rows } = await pool.query<UserRow>(
        `SELECT * FROM users WHERE phone_number = $1 AND deleted_at IS NULL`,
        [phoneNumber],
      );
      return rows[0] ? toUser(rows[0]) : null;
    },

    // includes soft-deleted
    async softDelete(id: string): Promise<void> {
      await pool.query(
        `UPDATE users SET deleted_at = now() WHERE id = $1 AND deleted_at IS NULL`,
        [id],
      );
    },
  };
}
