import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import InformationController from "../controllers/information.controller";

class InformationRoute implements Routes {
  public router = Router();
  public informationController = new InformationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/banner", this.informationController.getAllBanner);
    this.router.get("/services", this.informationController.getAllService);
  }
}

export default InformationRoute;
