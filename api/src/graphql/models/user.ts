import { Table, Column, Model, HasMany } from 'sequelize-typescript'

import todo from './todo'

interface UserAttributes {
  id: number
  name: string
  email: string
  password: string
}

@Table
class User extends Model<UserAttributes>{
  @Column
  name: string

  @Column
  email: string

  @Column
  password: string

  @Column
  completed: boolean

  @HasMany(() => todo)
  user: todo[]
}

export default User