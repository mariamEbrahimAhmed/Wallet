import { PoolClient } from "pg";
import { Wallet } from "../models";
import { CreateWalletDto } from "../types";

export interface WalletRepository {
  create(input: CreateWalletDto, client?: PoolClient): Promise<Wallet>;
  findByUserId(userId: string): Promise<Wallet | null>;
  deposit(): Promise<Wallet>;
  withdraw(walletId: string, amount: string, client?: PoolClient): Promise<Wallet>;
  softDelete(id: string): Promise<void>;
}
