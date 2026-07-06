import { NextFunction, Request, Response } from "express";
import { AppError, BadRequestError } from "../errors";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      ...(err instanceof BadRequestError && err.errors ? { errors: err.errors } : {}),
    });
    return;
  }

  console.error(err); //to be removed
  res.status(500).json({ message: "Internal server error" });
}
