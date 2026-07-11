import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import { errorHandler } from "./middlewares";
import {AppRoutes} from "./container";
export function createApp(container: AppRoutes) {
  const app = express();

  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  app.use("/users", container.userRoutes);
  app.use("/auth", container.authRoutes);
  app.use("/wallets", container.walletRoutes);

  app.use(errorHandler);

  return app;
}
