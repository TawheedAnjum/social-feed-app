import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import {
  notFound,
  errorHandler,
} from "./middlewares/error.middleware.js";

const app = express();

/**
 * Security
 */
app.use(helmet());

/**
 * Logging
 */
app.use(morgan("dev"));

/**
 * Body Parser
 */
app.use(express.json());

/**
 * CORS
 */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

/**
 * Health Check
 */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

/**
 * Routes
 */
app.use("/api/auth", authRoutes);

/**
 * 404 Handler
 */
app.use(notFound);

/**
 * Global Error Handler
 */
app.use(errorHandler);

export default app;