import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import {
  Profile,
  RegisterDTO,
  UpdateProfileDTO,
} from "../interface/membership.interface";
import { HttpException } from "../middlewares/error.middleware";
import MembershipRespository from "../repositories/membership.repository";
import path from "path";
import { UploadedFile } from "express-fileupload";

dotenv.config();

const tokenSecret = process.env.JWT_SECRET || "test_secret";

class MembershipService {
  /**
   * @function register - register user baru
   * @param data - data user baru
   * @returns {Promise<null>} - null
   */
  public async register(data: RegisterDTO): Promise<null> {
    const { email, first_name, last_name, password } = data;

    const user = await MembershipRespository.findUserByEmail(email);
    if (user)
      throw new HttpException(
        409,
        109,
        "Email sudah terdaftar, silahkan gunakan email lain"
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    await MembershipRespository.insertUser(
      email,
      first_name,
      last_name,
      hashedPassword
    );

    return null;
  }

  /**
   * @function login - login user
   * @param data - data login
   * @returns {Promise<{token: string}>} - token
   */
  public async login(data: RegisterDTO): Promise<{ token: string }> {
    const { email, password } = data;

    const user = await MembershipRespository.findUserByEmail(email);
    if (!user)
      throw new HttpException(401, 103, "Username atau password salah");

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new HttpException(401, 103, "Username atau password salah");

    const token = jwt.sign({ user_email: user.email }, tokenSecret, {
      expiresIn: "12h",
    });

    return { token };
  }

  /**
   * @function getProfile - get profile user
   * @param user_email - email user
   * @returns {Promise<Profile>} - profile user
   */
  public async getProfile(user_email: string): Promise<Profile> {
    const user = await MembershipRespository.findUserByEmail(user_email);
    if (!user) throw new HttpException(404, 104, "User tidak ditemukan");

    return {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_image: user.profile_image,
    };
  }

  /**
   * @function updateProfile - update profile user
   * @param user_email - email user
   * @param data - data profile user
   * @returns {Promise<Profile>} - profile user
   */
  public async updateProfile(
    user_email: string,
    data: UpdateProfileDTO
  ): Promise<Profile> {
    const { first_name, last_name } = data;

    const user = await MembershipRespository.findUserByEmail(user_email);
    if (!user) throw new HttpException(404, 104, "User tidak ditemukan");

    const updatedUser = await MembershipRespository.updateProfile(
      user_email,
      first_name,
      last_name
    );

    return {
      email: updatedUser.email,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      profile_image: updatedUser.profile_image,
    };
  }

  private async saveImage(file: UploadedFile): Promise<string> {
    const fileName = `${uuidv4()}.${file.name.split(".").pop()}`;
    const filePath = "src/public/assets/" + fileName;
    const filePaths = path.join(__dirname, "../..", filePath);

    await file.mv(filePaths);

    return filePath;
  }

  public async uploadProfileImage(
    user_email: string,
    file: any
  ): Promise<Profile> {
    const user = await MembershipRespository.findUserByEmail(user_email);
    if (!user) throw new HttpException(404, 104, "User tidak ditemukan");

    const filePath = await this.saveImage(file);

    const updatedUser = await MembershipRespository.updateProfileImage(
      user_email,
      filePath
    );

    return {
      email: updatedUser.email,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      profile_image: updatedUser.profile_image,
    };
  }
}

export default MembershipService;
