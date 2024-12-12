import pool from "../config/database";
import { User } from "../interface/membership.interface";
import logger from "../logs/logger";
import { HttpException } from "../middlewares/error.middleware";

export default class MembershipRespository {
  /**
   * @function insertUser - insert user baru ke database
   * @param email
   * @param first_name
   * @param last_name
   * @param password
   * @returns {Promise<User>} - data user yang baru saja diinsert
   */
  static async insertUser(
    email: string,
    first_name: string,
    last_name: string,
    password: string
  ): Promise<User> {
    const query = `INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *`;

    const values = [email, first_name, last_name, password];

    try {
      const { rows } = await pool.query<User>(query, values);

      return rows[0];
    } catch (error) {
      logger.error(
        "[Database Error] - [MembershipRepository] - [insertUser]: " + error
      );

      throw new HttpException(500, 105, "Database Error");
    }
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    const query = `SELECT * FROM users WHERE email = $1`;

    const values = [email];

    try {
      const { rows } = await pool.query<User>(query, values);

      return rows[0];
    } catch (error) {
      logger.error(
        "[Database Error] - [MembershipRepository] - [findUserByEmail]: " +
          error
      );

      throw new HttpException(500, 105, "Database Error");
    }
  }
}
