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
}

export default TransactionController;
