import { createApp } from "./app";
import { config } from "./config";
import { connectToDatabase } from "./config/db";
import { buildContainer } from "./container";

async function main(): Promise<void> {
  await connectToDatabase();

  const container = buildContainer();
  const app = createApp(container);

  app.listen(config.port, () => {
    console.log(`Wallet API listening on port ${config.port}`);
  });
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
