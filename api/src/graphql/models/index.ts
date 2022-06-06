import { Sequelize } from 'sequelize-typescript'

import Todo from './todo'
import User from './user'

const sequelize = new Sequelize({
  database: 'task',
  dialect: 'postgres',
  username: 'postgres',
  password: 'graphql',
  host: 'localhost',
  port: 5432,
  models: [__dirname + [Todo, User]] // or [Player, Team],
})

export default sequelize