import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
  async registerUser(req: Request, res: Response): Promise<void> {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  },

  async getUserById(req: Request, res: Response): Promise<void> {
    const user = await userService.getUserById(req.params.id as string);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  },

  async deleteUser(req: Request, res: Response): Promise<void> {
    await userService.deleteUser(req.params.id as string);
    res.status(204).send();
  },
};
