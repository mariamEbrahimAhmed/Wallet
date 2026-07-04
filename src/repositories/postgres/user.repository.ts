import { Pool } from "pg";
import { User } from "../../models";
import { CreateUserDto } from "../../types";
import { UserRepository } from "../user.repository.interface";

interface UserRow {
  id: string;
  username: string;
  phone_number: string;
  hashed_password: string;
  created_at: Date;
  deleted_at: Date | null;
  totp_secret: string | null;
}

function toUser(row: UserRow): User {
  return {
    id: row.id,
    username: row.username,
    phoneNumber: row.phone_number,
    hashedPassword: row.hashed_password,
    createdAt: row.created_at,
    deletedAt: row.deleted_at,
    totpSecret: row.totp_secret,
  };
}

export function createUserRepository(pool: Pool): UserRepository {
  return {
    async create(input: CreateUserDto): Promise<User> {
      const { rows } = await pool.query<UserRow>(
        `INSERT INTO users (username, phone_number, hashed_password)
       VALUES ($1, $2, $3)
       RETURNING *`,
        [input.username, input.phoneNumber, input.hashedPassword],
      );
      return toUser(rows[0]);
    },

    async findById(id: string): Promise<User | null> {
      const { rows } = await pool.query<UserRow>(
        `SELECT * FROM users WHERE id = $1`,
        [id],
      );
      return rows[0] ? toUser(rows[0]) : null;
    },

    async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
      const { rows } = await pool.query<UserRow>(
        `SELECT * FROM users WHERE phone_number = $1 AND deleted_at IS NULL`,
        [phoneNumber],
      );
      return rows[0] ? toUser(rows[0]) : null;
    },

    async softDelete(id: string): Promise<void> {
      await pool.query(
        `UPDATE users SET deleted_at = now() WHERE id = $1 AND deleted_at IS NULL`,
        [id],
      );
    },
  };
}
