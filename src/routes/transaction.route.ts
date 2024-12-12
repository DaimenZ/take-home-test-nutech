import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import TransactionController from "../controllers/transaction.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import validate from "../middlewares/validation.middleware";
import transactionSchemas from "../validators/transaction.validation";

class TransactionRoute implements Routes {
  public router = Router();
  public transactionController = new TransactionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/balance",
      authenticateToken,
      this.transactionController.getUserBalance
    );
    this.router.post(
      "/topup",
      authenticateToken,
      validate(transactionSchemas.topup),
      this.transactionController.topupBalance
    );
    this.router.post(
      "/transaction",
      authenticateToken,
      validate(transactionSchemas.transaction),
      this.transactionController.serviceTransaction
    );
    this.router.get(
      "/transaction/history",
      authenticateToken,
      validate(transactionSchemas.transactionHistory, "query"),
      this.transactionController.getTransactionHistory
    );
  }
}

export default TransactionRoute;
