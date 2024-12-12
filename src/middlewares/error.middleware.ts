import { NextFunction, Request, Response } from "express";

export class HttpException extends Error {
  statusCode: number;
  status: number;
  message: string;

  constructor(statusCode: number, status: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
  }
}

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = error.status;
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong";

    res.status(statusCode).json({ status, message, data: null });
  } catch (error) {
    next(error);
  }
};
