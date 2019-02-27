import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: process.env.DATABASE_DEVELOPMENT,
  test: process.env.DATABASE_TEST,
  production: process.env.DATABASE_URL,
};

const env = process.env.NODE_ENV || 'development';
const connectionString = config[env];

export default connectionString;
