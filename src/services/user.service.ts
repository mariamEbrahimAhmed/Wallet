import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user.repository";
import { User } from "../models";

const SALT_ROUNDS = 12;

export interface RegisterUserInput {
  username: string;
  phoneNumber: string;
  password: string;
}

export const userService = {
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
