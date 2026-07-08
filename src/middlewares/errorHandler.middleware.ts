import { NextFunction, Request, Response } from "express";
import { AppError, BadRequestError } from "../errors";
import { logger } from "../config/logger";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      logger.error({ err }, err.message);
    } else {
      logger.warn({ err }, err.message);
    }

    res.status(err.statusCode).json({
      message: err.message,
      ...(err instanceof BadRequestError && err.errors ? { errors: err.errors } : {}),
    });
    return;
  }

  logger.error({ err }, err instanceof Error ? err.message : "Unhandled error");
  res.status(500).json({ message: "Internal server error" });
}
