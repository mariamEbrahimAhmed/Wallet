import type { User } from "../models";

export type PublicUser = Omit<User, "hashedPassword" | "totpSecret">;

export function toPublicUser(user: User): PublicUser {
  const { hashedPassword, totpSecret, ...publicUser } = user;
  return publicUser;
}
