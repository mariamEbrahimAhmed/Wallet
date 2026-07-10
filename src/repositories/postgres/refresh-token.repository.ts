import { Pool } from "pg";
import { RefreshToken } from "../../models";
import { RefreshTokenRepository } from "../refresh-token.repository.interface";
import { RefreshTokenRow, toRefreshToken } from "./mappers/refresh-token.mapper";

export function createRefreshTokenRepository(pool: Pool): RefreshTokenRepository {
  return {
    async setHashedToken(userId: string, hashedToken: string): Promise<void> {
      await pool.query(
        `INSERT INTO refresh_tokens (user_id, hashed_token) VALUES ($1, $2)`,
        [userId, hashedToken],
      );
    },

    async revokeByHashedToken(hashedToken: string): Promise<void> {
      await pool.query(
        `UPDATE refresh_tokens SET revoked_at = now() WHERE hashed_token = $1 AND revoked_at IS NULL`,
        [hashedToken],
      );
    },

    async findByHashedToken(hashedToken: string): Promise<RefreshToken | null> {
      const { rows } = await pool.query<RefreshTokenRow>(
        `SELECT * FROM refresh_tokens WHERE hashed_token = $1`,
        [hashedToken],
      );
      return rows[0] ? toRefreshToken(rows[0]) : null;
    },
  };
}
