import { Router } from "express";
import type { UserController } from "../controllers/user.controller";

export function createUserRoutes(userController: UserController): Router {
  const router = Router();

  router.post("/", userController.registerUser);
  router.get("/:id", userController.getUserById);
  router.delete("/:id", userController.deleteUser);

  return router;
}
