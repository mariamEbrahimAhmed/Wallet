import { AppError } from "./AppError";
import { HttpStatusCode } from "../constants/http-status-codes";

export class InsufficientFundsError extends AppError {
  constructor(message = "Insufficient funds") {
    super(message, HttpStatusCode.UNPROCESSABLE_ENTITY);
  }
}
