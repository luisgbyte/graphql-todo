import { Sequelize } from 'sequelize-typescript'
import 'dotenv/config';

import Todo from './todo'
import User from './user'

const models = {
  User,
  Todo,
};

const sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  dialect: 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  models: [User, Todo]
})

export { sequelize };

export default models