import pool from "../config/database";
import { Banner, Service } from "../interface/information.interface";
import logger from "../logs/logger";
import { HttpException } from "../middlewares/error.middleware";

class InformationRepository {
  /**
   * @function findAllBanner - mencari semua banner
   * @returns {Promise<Banner[]>} - banner
   */
  static async findAllBanner(): Promise<Banner[]> {
    const query = `SELECT * FROM banners`;

    try {
      const { rows } = await pool.query<Banner>(query);

      return rows;
    } catch (error) {
      logger.error(
        "[Database Error] - [InformationRepository] - [findAllBanner]: " + error
      );

      throw new HttpException(500, 105, "Database Error");
    }
  }

  /**
   * @function findAllService - mencari semua service
   * @returns {Promise<Service[]>} - service
   */
  static async findAllService(): Promise<Service[]> {
    const query = `SELECT * FROM services`;

    try {
      const { rows } = await pool.query<Service>(query);

      return rows;
    } catch (error) {
      logger.error(
        "[Database Error] - [InformationRepository] - [findAllService]: " +
          error
      );

      throw new HttpException(500, 105, "Database Error");
    }
  }

  static async findServiceByCode(
    service_code: string
  ): Promise<Service | null> {
    const query = `SELECT * FROM services WHERE service_code = $1`;

    const values = [service_code];

    try {
      const { rows } = await pool.query<Service>(query, values);

      return rows[0];
    } catch (error) {
      logger.error(
        "[Database Error] - [InformationRepository] - [findServiceByCode]: " +
          error
      );

      throw new HttpException(500, 105, "Database Error");
    }
  }
}

export default InformationRepository;
