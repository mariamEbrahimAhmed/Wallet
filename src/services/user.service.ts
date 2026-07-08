import type { Logger } from "pino";
import type { UserRepository } from "../repositories/user.repository.interface";
import { User } from "../models";
import { AppError } from "../errors";
import { hashPassword } from "../utils";
import type { RegisterUserInput } from "../types";

export function createUserService(deps: { userRepository: UserRepository; logger: Logger }) {
  const { userRepository, logger } = deps;

  return {
    async registerUser(input: RegisterUserInput): Promise<User> {
      try {
        const hashedPassword = await hashPassword(input.password);
        const user = await userRepository.create({
          username: input.username,
          phoneNumber: input.phoneNumber,
          hashedPassword,
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
