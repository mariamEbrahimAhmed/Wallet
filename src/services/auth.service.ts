import type { UserService } from "./user.service";
import type { RefreshTokenRepository } from "../repositories/refresh-token.repository.interface";
import type { RegisterDto, LoginDto } from "../dtos/auth.dto";
import type { User } from "../models";
import type { LoginResult } from "../types";
import { AuthenticationError } from "../errors";
import { comparePassword, hashToken, generateAccessToken, generateRefreshToken } from "../utils";

export function createAuthService(deps: { userService: UserService; refreshTokenRepository: RefreshTokenRepository }) {
  const { userService, refreshTokenRepository } = deps;

  return {
    async register(input: RegisterDto): Promise<User> {
      return userService.registerUser(input);
    },

    async login(input: LoginDto): Promise<LoginResult> {
      const user = await userService.getUserByPhoneNumber(input.phoneNumber);
      if (!user) {
        throw new AuthenticationError("Wrong phone number or password");
      }

      const isPasswordValid = await comparePassword(input.password, user.hashedPassword);
      if (!isPasswordValid) {
        throw new AuthenticationError("Wrong phone number or password");
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken();
      await refreshTokenRepository.setHashedToken(user.id, hashToken(refreshToken));

      return { user, accessToken, refreshToken };
    },

    async logout(refreshToken: string | undefined): Promise<void> {
      if (!refreshToken) {
        return;
      }
      await refreshTokenRepository.revokeByHashedToken(hashToken(refreshToken));
    },

    async refreshToken(refreshToken: string): Promise<string> {
      const storedToken = await refreshTokenRepository.findByHashedToken(hashToken(refreshToken));
      if (!storedToken || storedToken.revokedAt || storedToken.expiresAt < new Date()) {
        throw new AuthenticationError("Invalid refresh token");
      }

      const user = await userService.getUserById(storedToken.userId);
      if (!user) {
        throw new AuthenticationError("Invalid refresh token");
      }

      return generateAccessToken(user);
    },
  };
}

export type AuthService = ReturnType<typeof createAuthService>;
