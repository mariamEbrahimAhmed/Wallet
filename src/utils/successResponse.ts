import { Response } from "express";
import { HttpStatusCode } from "../constants/http-status-codes";

export function sendSuccess<T>(res: Response, data: T, statusCode: HttpStatusCode = HttpStatusCode.OK): Response {
  return res.status(statusCode).json({ success: true, data });
}
