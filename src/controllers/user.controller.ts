import { Request, Response } from "express";
import type { UserService } from "../services/user.service";
import { sendSuccess } from "../utils";
import { NotFoundError } from "../errors";

export function createUserController(deps: { userService: UserService }) {
  const { userService } = deps;

  return {
    async registerUser(req: Request, res: Response): Promise<void> {
      const user = await userService.registerUser(req.body);
      sendSuccess(res, user, 201);
    },

    async getUserById(req: Request, res: Response): Promise<void> {
      const user = await userService.getUserById(req.params.id as string);
      if (!user) {
        throw new NotFoundError("User not found");
      }
      sendSuccess(res, user);
    },

    async deleteUser(req: Request, res: Response): Promise<void> {
      await userService.deleteUser(req.params.id as string);
      res.status(204).send();
    },
  };
}

export type UserController = ReturnType<typeof createUserController>;
