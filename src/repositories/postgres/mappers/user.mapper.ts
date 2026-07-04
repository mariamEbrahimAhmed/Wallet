import { User } from "../../../models";

export interface UserRow {
  id: string;
  username: string;
  phone_number: string;
  hashed_password: string;
  created_at: Date;
  deleted_at: Date | null;
  totp_secret: string | null;
}

export function toUser(row: UserRow): User {
  return {
    id: row.id,
    username: row.username,
    phoneNumber: row.phone_number,
    hashedPassword: row.hashed_password,
    createdAt: row.created_at,
    deletedAt: row.deleted_at,
    totpSecret: row.totp_secret,
  };
}
