import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript'

import todo from './todo'

interface IUserAttributes {
  id: number
  name: string
  email: string
  password: string
}

@Table
class User extends Model<IUserAttributes>{
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @Column({
    allowNull: false, validate: { len: [4, 50] }
  })
  name: string

  @Column({ allowNull: false, unique: true, validate: { isEmail: true } })
  email: string

  @Column({ allowNull: false, validate: { len: [7, 42] } })
  password: string

  @HasMany(() => todo, 'userId')
  todos: todo[]

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}

export default User