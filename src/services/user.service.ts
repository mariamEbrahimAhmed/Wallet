import bcrypt from "bcrypt";
import type { UserRepository } from "../repositories/user.repository.interface";
import { User } from "../models";

const SALT_ROUNDS = 12;

export interface RegisterUserInput {
  username: string;
  phoneNumber: string;
  password: string;
}

export function createUserService(deps: { userRepository: UserRepository }) {
  const { userRepository } = deps;

  return {
    async registerUser(input: RegisterUserInput): Promise<User> {
      const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);
      return userRepository.create({
        username: input.username,
        phoneNumber: input.phoneNumber,
        hashedPassword,
      });
    },

    async getUserById(id: string): Promise<User | null> {
      return userRepository.findById(id);
    },

    async deleteUser(id: string): Promise<void> {
      await userRepository.softDelete(id);
    },
  };
}

export type UserService = ReturnType<typeof createUserService>;
