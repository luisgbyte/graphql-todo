import { Table, Column, Model, PrimaryKey, BelongsTo, AutoIncrement, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript'

import user from './user'

interface ITodoAttributes {
  id: string
  title: string
  description: string
  completed: boolean
}

@Table
class Todo extends Model<ITodoAttributes>{
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @Column({ allowNull: false, validate: { len: [1, 25] } })
  title: string

  @Column({ allowNull: false, validate: { len: [1, 50] } })
  description: string

  @Column({ defaultValue: false })
  completed: boolean

  @ForeignKey(() => user)
  @Column
  userId: number

  @BelongsTo(() => user, 'userId')
  user: user

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}

export default Todo