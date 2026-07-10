export interface RefreshToken {
  id: string;
  userId: string;
  hashedToken: string;
  revokedAt: Date | null;
  expiresAt: Date;
  createdAt: Date;
}
