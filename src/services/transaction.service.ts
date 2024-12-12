import {
  Payment,
  TransactionHistory,
} from "../interface/transaction.interface";
import { HttpException } from "../middlewares/error.middleware";
import InformationRepository from "../repositories/information.repository";
import MembershipRespository from "../repositories/membership.repository";
import TransactionRepository from "../repositories/transaction.repository";

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

  public async topupBalance(
    user_email: string,
    amount: number
  ): Promise<{ balance: number }> {
    const user = await TransactionRepository.updateUserBalance(
      user_email,
      amount
    );

    const invoice_number = await TransactionRepository.generateInvoiceNumber();

    await TransactionRepository.insertTransaction(
      user.email,
      invoice_number,
      "TOPUP",
      "Top Up balance",
      amount
    );

    return {
      balance: user.balance,
    };
  }

  public async serviceTransaction(
    user_email: string,
    service_code: string
  ): Promise<Payment> {
    const user = await MembershipRespository.findUserByEmail(user_email);
    if (!user) throw new HttpException(404, 104, "User tidak ditemukan");

    const service = await InformationRepository.findServiceByCode(service_code);
    if (!service)
      throw new HttpException(
        404,
        104,
        "Service ataus Layanan tidak ditemukanService tidak ditemukan"
      );

    if (user.balance < service.service_tariff)
      throw new HttpException(400, 102, "Balance tidak cukup");

    const invoice_number = await TransactionRepository.generateInvoiceNumber();

    const transaction = await TransactionRepository.insertTransaction(
      user.email,
      invoice_number,
      "PAYMENT",
      service.service_name,
      service.service_tariff
    );

    await TransactionRepository.updateUserBalance(
      user.email,
      -service.service_tariff
    );

    return {
      invoice_number: transaction.invoice_number,
      service_code: service.service_code,
      service_name: service.service_name,
      transaction_type: transaction.transaction_type,
      total_amount: transaction.total_amount,
      created_on: transaction.created_on,
    };
  }

  public async getTransactionHistory(
    user_email: string,
    offset: number,
    limit?: number
  ): Promise<TransactionHistory> {
    const transactions = await TransactionRepository.findAllTransaction(
      user_email,
      offset,
      limit
    );

    const formattedTransactions = transactions.map((transaction) => {
      return {
        invoice_number: transaction.invoice_number,
        transaction_type: transaction.transaction_type,
        description: transaction.description,
        total_amount: transaction.total_amount,
        created_on: transaction.created_on,
      };
    });

    return {
      offset,
      limit,
      records: formattedTransactions,
    };
  }
}

export default TransactionService;
