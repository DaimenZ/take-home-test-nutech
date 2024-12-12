import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import MembershipController from "../controllers/membership.controller";
import validate from "../middlewares/validation.middleware";
import membershipSchemas from "../validators/membership.validation";

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
  }
}

export default MembershipRoute;
