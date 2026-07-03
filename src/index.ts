import "dotenv/config";
import { createServer, IncomingMessage, ServerResponse } from "node:http";

const port = process.env.PORT ?? 3000;

function handleRequest(req: IncomingMessage, res: ServerResponse): void {
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
}

const server = createServer(handleRequest);

server.listen(port, () => {
  console.log(`Wallet API listening on port ${port}`);
});
