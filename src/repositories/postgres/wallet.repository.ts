import { Pool, PoolClient } from "pg";
import { Wallet } from "../../models";
import { CreateWalletDto } from "../../dtos/wallet.dto";
import { WalletRepository } from "../wallet.repository.interface";
import { WalletRow, toWallet } from "./mappers/wallet.mapper";
import { NotFoundError, InsufficientFundsError } from "../../errors";

export function createWalletRepository(pool: Pool): WalletRepository {
  return {
    async create(input: CreateWalletDto, client?: PoolClient): Promise<Wallet> {
      const { rows } = await (client ?? pool).query<WalletRow>(
        `INSERT INTO wallets (user_id, balance)
       VALUES ($1, 0)
       RETURNING *`,
        [input.userId],
      );
      return toWallet(rows[0]);
    },

    async findByUserId(userId: string): Promise<Wallet | null> {
      const { rows } = await pool.query<WalletRow>(
        `SELECT * FROM wallets WHERE user_id = $1 AND deleted_at IS NULL`,
        [userId],
      );
      return rows[0] ? toWallet(rows[0]) : null;
    },

    async deposit(): Promise<Wallet> {
      throw new Error("Not implemented");
    },

    async withdraw(walletId: string, amount: string, client?: PoolClient): Promise<Wallet> {
      const { rows } = await (client ?? pool).query<WalletRow>(
        `UPDATE wallets
         SET balance = balance - $2, updated_at = now()
         WHERE id = $1 AND deleted_at IS NULL AND balance >= $2
         RETURNING *`,
        [walletId, amount],
      );
      if (rows[0]) {
        return toWallet(rows[0]);
      }

      const { rows: existingRows } = await (client ?? pool).query<WalletRow>(
        `SELECT * FROM wallets WHERE id = $1 AND deleted_at IS NULL`,
        [walletId],
      );
      if (!existingRows[0]) {
        throw new NotFoundError("Wallet not found");
      }
      throw new InsufficientFundsError();
    },

    async softDelete(id: string): Promise<void> {
      await pool.query(
        `UPDATE wallets SET deleted_at = now() WHERE id = $1 AND deleted_at IS NULL`,
        [id],
      );
    },
  };
}
