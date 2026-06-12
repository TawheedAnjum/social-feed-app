import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

/**
 * Load environment variables
 */
dotenv.config();

/**
 * Connect Database
 */
await connectDB();

const PORT = process.env.PORT || 5000;

/**
 * Start Server
 */
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

/**
 * Graceful Shutdown
 */
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down server...");

  server.close(() => {
    console.log("✅ HTTP server closed");
    process.exit(0);
  });
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 SIGTERM received");

  server.close(() => {
    console.log("✅ HTTP server closed");
    process.exit(0);
  });
});