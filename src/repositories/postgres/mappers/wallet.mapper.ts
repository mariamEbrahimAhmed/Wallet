import { Wallet } from "../../../models";

export interface WalletRow {
  id: string;
  user_id: string;
  balance: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export function toWallet(row: WalletRow): Wallet {
  return {
    id: row.id,
    userId: row.user_id,
    balance: row.balance,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,
  };
}
