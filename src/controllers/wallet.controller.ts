import { Request, Response } from "express";
import type { WalletService } from "../services/wallet.service";
import type { WithdrawDto } from "../dtos/wallet.dto";
import { sendSuccess } from "../utils";
import { NotFoundError } from "../errors";

export function createWalletController(deps: { walletService: WalletService }) {
  const { walletService } = deps;

  return {
    async getWalletByUserId(req: Request, res: Response): Promise<void> {
      const wallet = await walletService.getWalletByUserId(req.params.userId as string);
      if (!wallet) {
        throw new NotFoundError("Wallet not found");
      }
      sendSuccess(res, wallet);
    },

    async deposit(req: Request, res: Response): Promise<void> {},

    async withdraw(req: Request<unknown, unknown, WithdrawDto>, res: Response): Promise<void> {
      const wallet = await walletService.withdraw(req.body);
      sendSuccess(res, wallet);
    },
  };
}

export type WalletController = ReturnType<typeof createWalletController>;
