import { RefreshToken } from "../../../models";

export interface RefreshTokenRow {
  id: string;
  user_id: string;
  hashed_token: string;
  revoked_at: Date | null;
  expires_at: Date;
  created_at: Date;
}

export function toRefreshToken(row: RefreshTokenRow): RefreshToken {
  return {
    id: row.id,
    userId: row.user_id,
    hashedToken: row.hashed_token,
    revokedAt: row.revoked_at,
    expiresAt: row.expires_at,
    createdAt: row.created_at,
  };
}
