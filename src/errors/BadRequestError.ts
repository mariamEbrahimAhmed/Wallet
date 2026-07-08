import { AppError } from "./AppError";
import { HttpStatusCode } from "../constants/http-status-codes";

export class BadRequestError extends AppError {
  public readonly errors?: Record<string, string[]>;

  constructor(message = "Bad Request", errors?: Record<string, string[]>) {
    super(message, HttpStatusCode.BAD_REQUEST);
    this.errors = errors;
  }
}
