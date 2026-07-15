import { z } from "zod";

export interface CreateWalletDto {
  userId: string;
}

export const withdrawSchema = z.object({
  walletId: z.uuid(),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,4})?$/, "Amount must be a positive decimal with up to 4 decimal places")
    .refine((value) => parseFloat(value) > 0, "Amount must be greater than 0"),
});

export type WithdrawDto = z.infer<typeof withdrawSchema>;
