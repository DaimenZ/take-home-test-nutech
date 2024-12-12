import { NextFunction, Request, Response } from "express";
import MembershipService from "../services/membership.service";
import logger from "../logs/logger";
import { RequestWithUser } from "../interface/auth.interface";

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

  /**
   *
   * @function getProfile - get profile user
   */
  public getProfile = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user_email = req.user_email;

      const response = await this.membershipService.getProfile(user_email!);

      res.status(200).json({ status: 0, message: "Sukses", data: response });
    } catch (error) {
      logger.error(`[MembershipController] - [getProfile]: ${error}`);
      next(error);
    }
  };

  /**
   *
   * @function updateProfile - update profile user
   */
  public updateProfile = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user_email = req.user_email;

      const response = await this.membershipService.updateProfile(
        user_email!,
        req.body
      );

      res
        .status(200)
        .json({ status: 0, message: "Update Pofile berhasil", data: response });
    } catch (error) {
      logger.error(`[MembershipController] - [updateProfile]: ${error}`);
      next(error);
    }
  };
}

export default MembershipController;
