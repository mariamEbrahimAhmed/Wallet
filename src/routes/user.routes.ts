import { Router } from "express";
import { userController } from "../controllers/user.controller";

export const userRoutes = Router();

userRoutes.post("/", userController.registerUser);
userRoutes.get("/:id", userController.getUserById);
userRoutes.delete("/:id", userController.deleteUser);
