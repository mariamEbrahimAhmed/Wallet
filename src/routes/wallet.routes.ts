import { Router } from "express";
import type { WalletController } from "../controllers/wallet.controller";

export function createWalletRoutes(walletController: WalletController): Router {
  const router = Router();

  router.post("/", walletController.createWallet);
  router.post("/deposit", walletController.deposit);
  router.post("/withdraw", walletController.withdraw);

  return router;
}
