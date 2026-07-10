import { RefreshToken } from "../models";

export interface RefreshTokenRepository {
  setHashedToken(userId: string, hashedToken: string): Promise<void>;
  revokeByHashedToken(hashedToken: string): Promise<void>;
  findByHashedToken(hashedToken: string): Promise<RefreshToken | null>;
}
