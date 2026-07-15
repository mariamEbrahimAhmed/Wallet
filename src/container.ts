import { pool } from "./db/pool";
import { logger } from "./config/logger";
import { createUserRepository } from "./repositories/postgres/user.repository";
import { createUserService } from "./services/user.service";
import { createUserController } from "./controllers/user.controller";
import { createUserRoutes } from "./routes/user.routes";
import { createRefreshTokenRepository } from "./repositories/postgres/refresh-token.repository";
import { createAuthService } from "./services/auth.service";
import { createAuthController } from "./controllers/auth.controller";
import { createAuthRoutes } from "./routes/auth.routes";
import { createWalletRepository } from "./repositories/postgres/wallet.repository";
import { createWalletService } from "./services/wallet.service";
import { createWalletController } from "./controllers/wallet.controller";
import { createWalletRoutes } from "./routes/wallet.routes";

export function buildContainer() {
  const walletRepository = createWalletRepository(pool);
  const walletService = createWalletService({ walletRepository, logger });
  const walletController = createWalletController({ walletService });
  const walletRoutes = createWalletRoutes(walletController);

  const userRepository = createUserRepository(pool);
  const userService = createUserService({ userRepository, walletService, pool, logger });
  const userController = createUserController({ userService });
  const userRoutes = createUserRoutes(userController);

  const refreshTokenRepository = createRefreshTokenRepository(pool);
  const authService = createAuthService({ userService, refreshTokenRepository });
  const authController = createAuthController({ authService });
  const authRoutes = createAuthRoutes(authController);

  return { userRoutes, authRoutes, walletRoutes };
}

export type AppContainer = ReturnType<typeof buildContainer>;
export type AppRoutes = Pick<AppContainer, "userRoutes" | "authRoutes" | "walletRoutes">;
