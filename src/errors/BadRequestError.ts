import { AppError } from "./AppError";

export class BadRequestError extends AppError {
  public readonly errors?: Record<string, string[]>;

  constructor(message = "Bad Request", errors?: Record<string, string[]>) {
    super(message, 400);
    this.errors = errors;
  }
}
