CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    profile_image TEXT,
    password VARCHAR(255) NOT NULL,
    balance INTEGER DEFAULT 0,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Banners (
    id SERIAL PRIMARY KEY,
    banner_name VARCHAR(100) UNIQUE NOT NULL,
    banner_image TEXT NOT NULL,
    description TEXT,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Services (
    id SERIAL PRIMARY KEY,
    service_code VARCHAR(50) UNIQUE NOT NULL,
    service_name VARCHAR(100) NOT NULL,
    service_icon TEXT,
    service_tariff INTEGER NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Transactions (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    description TEXT,
    total_amount INTEGER NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_email FOREIGN KEY (user_email) REFERENCES Users(email) ON DELETE CASCADE
);
