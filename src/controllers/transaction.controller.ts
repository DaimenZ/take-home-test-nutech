import { NextFunction, Response } from "express";
import { RequestWithUser } from "../interface/auth.interface";
import TransactionService from "../services/transaction.service";
import logger from "../logs/logger";

class TransactionController {
  private transactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  /**
   * @function getUserBalance - get user balance
   */
  public getUserBalance = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user_email = req.user_email;

      const response = await this.transactionService.getUserBalance(
        user_email!
      );

      res.status(200).json({
        status: 0,
        message: "Get Balance Berhasil",
        data: response,
      });
    } catch (error) {
      logger.error(`[TransactionController] - [getUserBalance]: ${error}`);
      next(error);
    }
  };

  public topupBalance = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user_email = req.user_email;
      const { top_up_amount } = req.body;

      const response = await this.transactionService.topupBalance(
        user_email!,
        top_up_amount
      );

      res.status(200).json({
        status: 0,
        message: "Top Up Balance berhasil",
        data: response,
      });
    } catch (error) {
      logger.error(`[TransactionController] - [topupBalance]: ${error}`);
      next(error);
    }
  };

  public serviceTransaction = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user_email = req.user_email;
      const { service_code } = req.body;

      const response = await this.transactionService.serviceTransaction(
        user_email!,
        service_code
      );

      res.status(200).json({
        status: 0,
        message: "Transaksi Berhasil",
        data: response,
      });
    } catch (error) {
      logger.error(`[TransactionController] - [serviceTransaction]: ${error}`);
      next(error);
    }
  };

  public getTransactionHistory = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user_email = req.user_email;
      const offset = parseInt(req.query.offset as string) || 0;
      const limit = parseInt(req.query.limit as string) || undefined;

      const response = await this.transactionService.getTransactionHistory(
        user_email!,
        offset,
        limit
      );

      res.status(200).json({
        status: 0,
        message: "Get History Berhasil",
        data: response,
      });
    } catch (error) {
      logger.error(
        `[TransactionController] - [getTransactionHistory]: ${error}`
      );
      next(error);
    }
  };
}

export default TransactionController;
