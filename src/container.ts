import { pool } from "./config/db";
import { logger } from "./config/logger";
import { createUserRepository } from "./repositories/postgres/user.repository";
import { createUserService } from "./services/user.service";
import { createUserController } from "./controllers/user.controller";
import { createUserRoutes } from "./routes/user.routes";

export function buildContainer() {
  const userRepository = createUserRepository(pool);
  const userService = createUserService({ userRepository, logger });
  const userController = createUserController({ userService });
  const userRoutes = createUserRoutes(userController);

  return { userRoutes };
}

export type AppContainer = ReturnType<typeof buildContainer>;
