import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3).max(50),
  phoneNumber: z.string().min(1).max(20),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  phoneNumber: z.string().min(1).max(20),
  password: z.string().min(1),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
