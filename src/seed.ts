import logger from "./logs/logger";
import pool from "./config/database";

const main = async () => {
  logger.info("Start seeding ...");
  await pool.connect();

  const banners = [
    {
      banner_name: "Banner 1",
      banner_image: "https://nutech-integrasi.app/dummy.jpg",
      description: "Lerem Ipsum Dolor sit amet",
    },
    {
      banner_name: "Banner 2",
      banner_image: "https://nutech-integrasi.app/dummy.jpg",
      description: "Lerem Ipsum Dolor sit amet",
    },
    {
      banner_name: "Banner 3",
      banner_image: "https://nutech-integrasi.app/dummy.jpg",
      description: "Lerem Ipsum Dolor sit amet",
    },
    {
      banner_name: "Banner 4",
      banner_image: "https://nutech-integrasi.app/dummy.jpg",
      description: "Lerem Ipsum Dolor sit amet",
    },
    {
      banner_name: "Banner 5",
      banner_image: "https://nutech-integrasi.app/dummy.jpg",
      description: "Lerem Ipsum Dolor sit amet",
    },
    {
      banner_name: "Banner 6",
      banner_image: "https://nutech-integrasi.app/dummy.jpg",
      description: "Lerem Ipsum Dolor sit amet",
    },
  ];

  for (const banner of banners) {
    const query = `
      INSERT INTO banners (banner_name, banner_image, description) 
      VALUES ($1, $2, $3)
    `;
    await pool.query(query, [
      banner.banner_name,
      banner.banner_image,
      banner.description,
    ]);
  }

  const services = [
    {
      service_code: "PAJAK",
      service_name: "Pajak PBB",
      service_icon: "https://nutech-integrasi.app/dummy.jpg",
      service_tariff: 40000,
    },
    {
      service_code: "PLN",
      service_name: "Listrik",
      service_icon: "https://nutech-integrasi.app/dummy.jpg",
      service_tariff: 10000,
    },
    {
      service_code: "PDAM",
      service_name: "PDAM Berlangganan",
      service_icon: "https://nutech-integrasi.app/dummy.jpg",
      service_tariff: 40000,
    },
    {
      service_code: "PULSA",
      service_name: "Pulsa",
      service_icon: "https://nutech-integrasi.app/dummy.jpg",
      service_tariff: 40000,
    },
    {
      service_code: "PGN",
      service_name: "PGN Berlangganan",
      service_icon: "https://nutech-integrasi.app/dummy.jpg",
      service_tariff: 50000,
    },
    {
      service_code: "MUSIK",
      service_name: "Musik Berlangganan",
      service_icon: "https://nutech-integrasi.app/dummy.jpg",
      service_tariff: 50000,
    },
    {
      service_code: "TV",
      service_name: "TV Berlangganan",
      service_icon: "https://nutech-integrasi.app/dummy.jpg",
      service_tariff: 50000,
    },
    {
      service_code: "PAKET_DATA",
      service_name: "Paket data",
      service_icon: "https://nutech-integrasi.app/dummy.jpg",
      service_tariff: 50000,
    },
    {
      service_code: "VOUCHER_GAME",
      service_name: "Voucher Game",
      service_icon: "https://nutech-integrasi.app/dummy.jpg",
      service_tariff: 100000,
    },
    {
      service_code: "VOUCHER_MAKANAN",
      service_name: "Voucher Makanan",
      service_icon: "https://nutech-integrasi.app/dummy.jpg",
      service_tariff: 100000,
    },
    {
      service_code: "QURBAN",
      service_name: "Qurban",
      service_icon: "https://nutech-integrasi.app/dummy.jpg",
      service_tariff: 200000,
    },
    {
      service_code: "ZAKAT",
      service_name: "Zakat",
      service_icon: "https://nutech-integrasi.app/dummy.jpg",
      service_tariff: 300000,
    },
  ];

  for (const service of services) {
    const query = `
      INSERT INTO services (service_code, service_name, service_icon, service_tariff) 
      VALUES ($1, $2, $3, $4)
    `;
    await pool.query(query, [
      service.service_code,
      service.service_name,
      service.service_icon,
      service.service_tariff,
    ]);
  }

  logger.info("Seeding finished.");

  await pool.end();
};

main().catch((e) => {
  logger.error(`Error: %o`, e);
  pool.end();
  process.exit(1);
});
