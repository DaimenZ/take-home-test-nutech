import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import MembershipController from "../controllers/membership.controller";
import validate from "../middlewares/validation.middleware";
import membershipSchemas from "../validators/membership.validation";
import { authenticateToken } from "../middlewares/auth.middleware";

class MembershipRoute implements Routes {
  public router = Router();
  public membershipController = new MembershipController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/registration",
      validate(membershipSchemas.register),
      this.membershipController.register
    );
    this.router.post(
      "/login",
      validate(membershipSchemas.login),
      this.membershipController.login
    );
    this.router.get(
      "/profile",
      authenticateToken,
      this.membershipController.getProfile
    );
  }
}

export default MembershipRoute;
