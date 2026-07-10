import jwt from "jsonwebtoken";
import { config } from "../config";
import type { User } from "../models";

export interface AccessTokenPayload {
  sub: string;
  phoneNumber: string;
  username: string;
}

export function generateAccessToken(user: User): string {
  const payload: AccessTokenPayload = {
    sub: user.id,
    phoneNumber: user.phoneNumber,
    username: user.username,
  };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn as jwt.SignOptions["expiresIn"] });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, config.jwtSecret) as AccessTokenPayload;
}
