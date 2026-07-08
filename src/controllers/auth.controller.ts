import { Request, Response } from "express";
import type { AuthService } from "../services/auth.service";
import type { RegisterDto, LoginDto } from "../dtos/auth.dto";
import { sendSuccess, toPublicUser } from "../utils";
import { HttpStatusCode } from "../constants/http-status-codes";

export function createAuthController(deps: { authService: AuthService }) {
  const { authService } = deps;

  return {
    async register(req: Request<unknown, unknown, RegisterDto>, res: Response): Promise<void> {
      const user = await authService.register(req.body);
      sendSuccess(res, toPublicUser(user), HttpStatusCode.CREATED);
    },

    async login(req: Request<unknown, unknown, LoginDto>, res: Response): Promise<void> {
      const user = await authService.login(req.body);
      sendSuccess(res, toPublicUser(user));
    },
  };
}

export type AuthController = ReturnType<typeof createAuthController>;
