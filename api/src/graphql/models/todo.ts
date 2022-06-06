import { Table, Column, Model, HasOne } from 'sequelize-typescript'

import user from './user'

interface TodoAttributes {
  id: string
  title: string
  description: string
  completed: boolean
}

@Table
class Todo extends Model<TodoAttributes>{
  @Column
  title: string

  @Column
  description: string

  @Column
  completed: boolean

  @HasOne(() => user)
  userId: user
}

export default Todo