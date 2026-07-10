import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import type { AppContainer } from "./container";
import { errorHandler } from "./middlewares";

export function createApp(container: Pick<AppContainer, "userRoutes">) {
  const app = express();

  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];

  app.use(
    cors({
      origin: allowedOrigins,
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  app.use("/users", container.userRoutes);

  app.use(errorHandler);

  return app;
}
