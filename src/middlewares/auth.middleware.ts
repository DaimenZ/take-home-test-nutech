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

export const authenticateToken = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({
          status: 108,
          message: "Token tidak tidak valid atau kadaluwarsa",
          data: null,
        });

    const data = jwt.verify(token, tokenSecret) as DataStoredInToken;
    if (!data)
      return res
        .status(401)
        .json({
          status: 108,
          message: "Token tidak tidak valid atau kadaluwarsa",
          data: null,
        });

    req.user_email = data.user_email;

    next();
  } catch (error) {
    logger.error("Wrong authentication token");
    return res
      .status(401)
      .json({
        status: 108,
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null,
      });
  }
};
