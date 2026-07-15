import { Router } from "express";
import type { WalletController } from "../controllers/wallet.controller";
import { validateBody } from "../middlewares";
import { withdrawSchema } from "../dtos/wallet.dto";

export function createWalletRoutes(walletController: WalletController): Router {
  const router = Router();

  router.get("/user/:userId", walletController.getWalletByUserId);
  router.post("/deposit", walletController.deposit);
  router.post("/withdraw", validateBody(withdrawSchema), walletController.withdraw);

  return router;
}
