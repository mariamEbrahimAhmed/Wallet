import app from "./app";
import { config } from "./config";
import { connectToDatabase } from "./config/db";

async function main(): Promise<void> {
  await connectToDatabase();

  app.listen(config.port, () => {
    console.log(`Wallet API listening on port ${config.port}`);
  });
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
