import { AppError } from "./AppError";
import { HttpStatusCode } from "../constants/http-status-codes";

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, HttpStatusCode.NOT_FOUND);
  }
}
