import { AppError } from "./AppError";
import { HttpStatusCode } from "../constants/http-status-codes";

export class AuthorizationError extends AppError {
  constructor(message = "You do not have permission to perform this action") {
    super(message, HttpStatusCode.FORBIDDEN);
  }
}
