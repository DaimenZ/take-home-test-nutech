import dotenv from "dotenv";
import { createLogger, format, transports } from "winston";

dotenv.config();

const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level.toUpperCase()}] ${message} ${
        stack ? `\n${stack}` : ""
      }`;
    })
  ),
  transports: [
    new transports.Console({
      stderrLevels: ["error"],
    }),
    new transports.File({
      filename: "src/logs/error.log",
      level: "error",
    }),
    new transports.File({ filename: "src/logs/combined.log" }),
  ],
});

export default logger;
