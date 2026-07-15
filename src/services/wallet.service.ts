import type { Logger } from "pino";
import type { PoolClient } from "pg";
import type { WalletRepository } from "../repositories/wallet.repository.interface";
import { Wallet } from "../models";
import { AppError } from "../errors";
import type { CreateWalletDto, WithdrawDto } from "../dtos/wallet.dto";

export function createWalletService(deps: { walletRepository: WalletRepository; logger: Logger }) {
  const { walletRepository, logger } = deps;

  return {
    async createWallet(input: CreateWalletDto, client?: PoolClient): Promise<Wallet> {
      try {
        const wallet = await walletRepository.create(input, client);
        logger.info({ walletId: wallet.id }, "Wallet created");
        return wallet;
      } catch (err) {
        if (err instanceof AppError) {
          throw err;
        }
        throw new Error(`Failed to create wallet for user "${input.userId}"`, { cause: err });
      }
    },

    async getWalletByUserId(userId: string): Promise<Wallet | null> {
      return walletRepository.findByUserId(userId);
    },

    async deposit(): Promise<void> {},

    async withdraw(input: WithdrawDto): Promise<Wallet> {
      try {
        const wallet = await walletRepository.withdraw(input.walletId, input.amount);
        logger.info({ walletId: wallet.id }, "Wallet withdrawal");
        return wallet;
      } catch (err) {
        if (err instanceof AppError) {
          throw err;
        }
        throw new Error(`Failed to withdraw from wallet "${input.walletId}"`, { cause: err });
      }
    },
  };
}

export type WalletService = ReturnType<typeof createWalletService>;
