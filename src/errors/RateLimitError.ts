import { AppError } from "./AppError";
import { HttpStatusCode } from "../constants/http-status-codes";

export class RateLimitError extends AppError {
  constructor(message = "Too many requests") {
    super(message, HttpStatusCode.TOO_MANY_REQUESTS);
  }
}
