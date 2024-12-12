import bcrypt from "bcrypt";

import { RegisterDTO } from "../interface/membership.interface";
import { HttpException } from "../middlewares/error.middleware";
import MembershipRespository from "../repositories/membership.repository";

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
}

export default MembershipService;
