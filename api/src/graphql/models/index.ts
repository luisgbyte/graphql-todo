import { Sequelize } from 'sequelize-typescript'

import Todo from './todo'
import User from './user'

const models = {
  User,
  Todo,
};

const sequelize = new Sequelize({
  database: 'task',
  dialect: 'postgres',
  username: 'postgres',
  password: 'graphql',
  host: 'localhost',
  port: 5432,
  models: [User, Todo] // or [Player, Team],
})

export { sequelize };

export default models