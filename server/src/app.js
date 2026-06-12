import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

/**
 * Security middleware
 */
app.use(helmet());

/**
 * Request logger
 */
app.use(morgan("dev"));

/**
 * Body parser
 */
app.use(express.json());

/**
 * CORS setup
 */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

/**
 * Health check route
 */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

/**
 * Not found route
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

export default app;