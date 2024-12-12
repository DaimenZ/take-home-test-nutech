import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import TransactionController from "../controllers/transaction.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

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
  }
}

export default TransactionRoute;
