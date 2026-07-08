import { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { BadRequestError } from "../errors";

export function validateBody(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join(".") || "body";
        errors[path] = [...(errors[path] ?? []), issue.message];
      }
      throw new BadRequestError("Validation failed", errors);
    }

    req.body = result.data;
    next();
  };
}
