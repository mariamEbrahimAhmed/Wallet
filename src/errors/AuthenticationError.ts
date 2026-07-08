import { AppError } from "./AppError";
import { HttpStatusCode } from "../constants/http-status-codes";

export class AuthenticationError extends AppError {
  constructor(message = "Authentication required") {
    super(message, HttpStatusCode.UNAUTHORIZED);
  }
}
