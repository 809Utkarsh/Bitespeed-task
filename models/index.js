// db/index.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import ContactModel from './contact.js';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Required by Render's managed Postgres
    },
  },
});

const Contact = ContactModel(sequelize);

// Auto-create tables from models
await sequelize.sync();

export { sequelize, Contact };
