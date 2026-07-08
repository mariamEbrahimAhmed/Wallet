import { AppError } from "./AppError";
import { HttpStatusCode } from "../constants/http-status-codes";

export class ConflictError extends AppError {
  constructor(message = "Resource already exists") {
    super(message, HttpStatusCode.CONFLICT);
  }
}
