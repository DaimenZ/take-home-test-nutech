import { NextFunction, Request, Response } from "express";
import MembershipService from "../services/membership.service";
import logger from "../logs/logger";

class MembershipController {
  private membershipService;

  constructor() {
    this.membershipService = new MembershipService();
  }

  /**
   *
   * @function register - register user baru
   */
  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const response = await this.membershipService.register(req.body);

      res.status(200).json({
        status: 0,
        message: "Registrasi berhasil silahkan login",
        data: response,
      });
    } catch (error) {
      logger.error(`[MembershipController] - [register]: ${error}`);
      next(error);
    }
  };

  /**
   *
   * @function login - login user
   */
  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const response = await this.membershipService.login(req.body);

      res.status(200).json({
        status: 0,
        message: "Login Sukses",
        data: response,
      });
    } catch (error) {
      logger.error(`[MembershipController] - [login]: ${error}`);
      next(error);
    }
  };
}

export default MembershipController;
