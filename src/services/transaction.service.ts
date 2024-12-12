import { HttpException } from "../middlewares/error.middleware";
import MembershipRespository from "../repositories/membership.repository";

class TransactionService {
  /**
   * @function getUserBalance - mendapatkan balance user
   * @param user_email
   * @returns
   */
  public async getUserBalance(
    user_email: string
  ): Promise<{ balance: number }> {
    const user = await MembershipRespository.findUserByEmail(user_email);
    if (!user) throw new HttpException(404, 104, "User tidak ditemukan");

    return {
      balance: user.balance,
    };
  }
}

export default TransactionService;
