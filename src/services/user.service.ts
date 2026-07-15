import type { Pool } from "pg";
import type { Logger } from "pino";
import type { UserRepository } from "../repositories/user.repository.interface";
import type { WalletService } from "./wallet.service";
import { User } from "../models";
import { AppError } from "../errors";
import { hashPassword } from "../utils";
import { withAtomic } from "../db/withAtomic";
import type { RegisterUserInput } from "../types";

export function createUserService(deps: {
  userRepository: UserRepository;
  walletService: WalletService;
  pool: Pool;
  logger: Logger;
}) {
  const { userRepository, walletService, pool, logger } = deps;

  return {
    async registerUser(input: RegisterUserInput): Promise<User> {
      try {
        const hashedPassword = await hashPassword(input.password);
        const user = await withAtomic(pool, async (client) => {
          const createdUser = await userRepository.create(
            {
              username: input.username,
              phoneNumber: input.phoneNumber,
              hashedPassword,
            },
            client
          );
          await walletService.createWallet({ userId: createdUser.id }, client);
          return createdUser;
        });
        logger.info({ userId: user.id }, "User registered");
        return user;
      } catch (err) {
        if (err instanceof AppError) {
          throw err;
        }
        throw new Error(`Failed to register user "${input.username}"`, { cause: err });
      }
    },

    async getUserById(id: string): Promise<User | null> {
      return userRepository.findById(id);
    },

    async getUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
      return userRepository.findActiveByPhoneNumber(phoneNumber);
    },

    async deleteUser(id: string): Promise<void> {
      try {
        await userRepository.softDelete(id);
        logger.info({ userId: id }, "User deleted");
      } catch (err) {
        if (err instanceof AppError) {
          throw err;
        }
        throw new Error(`Failed to delete user "${id}"`, { cause: err });
      }
    },
  };
}

export type UserService = ReturnType<typeof createUserService>;
