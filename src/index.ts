import { createApp } from "./app";
import { config } from "./config";
import { connectToDatabase } from "./db/pool";
import { logger } from "./config/logger";
import { buildContainer } from "./container";

async function main(): Promise<void> {
  await connectToDatabase();

  const container = buildContainer();
  const app = createApp(container);

  app.listen(config.port, () => {
    logger.info(`Wallet API listening on port ${config.port}`);
  });
}

main().catch((error) => {
  logger.error({ err: error }, "Failed to start server");
  process.exit(1);
});
