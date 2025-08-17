import dotenv from 'dotenv';
dotenv.config();

export default {
  developement: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
  },
};
