import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { RegisterDTO } from "../interface/membership.interface";
import { HttpException } from "../middlewares/error.middleware";
import MembershipRespository from "../repositories/membership.repository";

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

    const token = jwt.sign({ email: user.email }, tokenSecret, {
      expiresIn: "12h",
    });

    return { token };
  }
}

export default MembershipService;
