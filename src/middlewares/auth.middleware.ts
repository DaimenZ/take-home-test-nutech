import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  DataStoredInToken,
  RequestWithUser,
} from "../interface/auth.interface";
import { NextFunction, Response } from "express";
import logger from "../logs/logger";

dotenv.config();

const tokenSecret = process.env.JWT_SECRET || "test_secret";

export const authenticateToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({
        status: 108,
        message: "Token tidak valid atau kadaluwarsa",
        data: null,
      });

      return;
    }

    const data = jwt.verify(token, tokenSecret) as DataStoredInToken;

    if (!data) {
      logger.error("Invalid token payload");
      res.status(401).json({
        status: 108,
        message: "Token tidak valid atau kadaluwarsa",
        data: null,
      });

      return;
    }

    req.user_email = data.user_email;

    next();
  } catch (error) {
    logger.error("Authentication error", error);
    res.status(401).json({
      status: 108,
      message: "Token tidak valid atau kadaluwarsa",
      data: null,
    });
  }
};
