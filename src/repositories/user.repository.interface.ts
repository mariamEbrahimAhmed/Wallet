import { User } from "../models";
import { CreateUserDto } from "../types";

export interface UserRepository {
  create(input: CreateUserDto): Promise<User>;
  findById(id: string): Promise<User | null>;
  findActiveByPhoneNumber(phoneNumber: string): Promise<User | null>;
  softDelete(id: string): Promise<void>;
}
