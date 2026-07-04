import express, { Request, Response } from "express";
import type { AppContainer } from "./container";

export function createApp(container: Pick<AppContainer, "userRoutes">) {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  app.use("/users", container.userRoutes);

  return app;
}
