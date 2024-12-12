import pool from "../config/database";
import { User } from "../interface/membership.interface";
import { Transaction } from "../interface/transaction.interface";
import logger from "../logs/logger";
import { HttpException } from "../middlewares/error.middleware";

export default class TransactionRepository {
  static async updateUserBalance(
    user_email: string,
    top_up_amount: number
  ): Promise<User> {
    const query = `UPDATE users SET balance = balance + $1 WHERE email = $2 RETURNING *`;

    const values = [top_up_amount, user_email];

    try {
      const { rows } = await pool.query<User>(query, values);

      return rows[0];
    } catch (error) {
      logger.error(
        "[Database Error] - [TransactionRepository] - [updateUserBalance]: " +
          error
      );

      throw new HttpException(500, 105, "Database Error");
    }
  }

  static async generateInvoiceNumber(): Promise<string> {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const dateString = `${day}${month}${year}`;

    const query = `SELECT COUNT(*)::integer AS count FROM transactions WHERE DATE(created_on) = CURRENT_DATE`;

    try {
      const { rows } = await pool.query<{ count: number }>(query);

      const count = rows[0].count + 1;

      const invoiceNumber = `INV${dateString}-${count
        .toString()
        .padStart(3, "0")}`;

      return invoiceNumber;
    } catch (error) {
      logger.error(
        "[Database Error] - [TransactionRepository] - [generateInvoiceNumber]: " +
          error
      );

      throw new HttpException(500, 105, "Database Error");
    }
  }

  static async insertTransaction(
    user_email: string,
    invoice_number: string,
    transaction_type: string,
    description: string,
    total_amount: number
  ): Promise<Transaction> {
    const query = `INSERT INTO transactions (user_email, invoice_number, transaction_type, description, total_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    const values = [
      user_email,
      invoice_number,
      transaction_type,
      description,
      total_amount,
    ];

    try {
      const { rows } = await pool.query<Transaction>(query, values);

      return rows[0];
    } catch (error) {
      logger.error(
        "[Database Error] - [TransactionRepository] - [insertTransaction]: " +
          error
      );

      throw new HttpException(500, 105, "Database Error");
    }
  }

  static async findAllTransaction(
    user_email: string,
    offset: number,
    limit?: number
  ): Promise<Transaction[]> {
    let query = `SELECT * FROM transactions WHERE user_email = $1 ORDER BY created_on DESC OFFSET $2`;

    const values = [user_email, offset];

    if (limit !== undefined) {
      query += ` LIMIT $3`;
      values.push(limit);
    }

    console.log("query", query);
    console.log("values", values);

    try {
      const { rows } = await pool.query<Transaction>(query, values);

      return rows;
    } catch (error) {
      logger.error(
        "[Database Error] - [TransactionRepository] - [findAllTransaction]: " +
          error
      );

      throw new HttpException(500, 105, "Database Error");
    }
  }
}
