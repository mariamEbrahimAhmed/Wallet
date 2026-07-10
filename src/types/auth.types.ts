import type { User } from "../models";

export interface RegisterUserInput {
  username: string;
  phoneNumber: string;
  password: string;
}

export interface LoginResult {
  user: User;
  accessToken: string;
  refreshToken: string;
}
