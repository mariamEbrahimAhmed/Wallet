import { Router } from "express";
import type { AuthController } from "../controllers/auth.controller";
import { validateBody } from "../middlewares";
import { registerSchema, loginSchema } from "../dtos/auth.dto";

export function createAuthRoutes(authController: AuthController): Router {
  const router = Router();

  router.post("/register", validateBody(registerSchema), authController.register);
  router.post("/login", validateBody(loginSchema), authController.login);
  router.post("/logout", authController.logout);
  router.post("/refresh-token", authController.refreshToken);

  return router;
}
