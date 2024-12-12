import { NextFunction, Request, Response } from "express";
import InformationService from "../services/information.service";
import logger from "../logs/logger";

class InformationController {
  private informationService;

  constructor() {
    this.informationService = new InformationService();
  }

  /**
   *
   * @function getAllBanner - get all banner
   */
  public getAllBanner = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const response = await this.informationService.getAllBanner();

      res.status(200).json({
        status: 0,
        message: "Sukses",
        data: response,
      });
    } catch (error) {
      logger.error(`[InformationController] - [getAllBanner]: ${error}`);
      next(error);
    }
  };

  /**
   *
   * @function getAllService - get all service
   */
  public getAllService = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const response = await this.informationService.getAllService();

      res.status(200).json({
        status: 0,
        message: "Sukses",
        data: response,
      });
    } catch (error) {
      logger.error(`[InformationController] - [getAllService]: ${error}`);
      next(error);
    }
  };
}

export default InformationController;
