import bcrypt from "bcrypt";
import type { Logger } from "pino";
import type { UserRepository } from "../repositories/user.repository.interface";
import { User } from "../models";

const SALT_ROUNDS = 12;

export interface RegisterUserInput {
  username: string;
  phoneNumber: string;
  password: string;
}

export function createUserService(deps: { userRepository: UserRepository; logger: Logger }) {
  const { userRepository, logger } = deps;

  return {
    async registerUser(input: RegisterUserInput): Promise<User> {
      try {
        const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);
        const user = await userRepository.create({
          username: input.username,
          phoneNumber: input.phoneNumber,
          hashedPassword,
        });
        logger.info({ userId: user.id }, "User registered");
        return user;
      } catch (err) {
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
        throw new Error(`Failed to delete user "${id}"`, { cause: err });
      }
    },
  };
}

export type UserService = ReturnType<typeof createUserService>;
