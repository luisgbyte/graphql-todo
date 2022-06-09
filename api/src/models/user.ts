import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, BeforeCreate } from 'sequelize-typescript'

import bcrypt from 'bcrypt';

import todo from './todo'

interface IUserAttributes {
  id: number
  name: string
  email: string
  password: string
  generatePasswordHash: () => void
  validatePassword: () => boolean
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

  @BeforeCreate
  static generatePasswordHash = async (instance: User) => {
    const saltRounds = 10;
    instance.password = await bcrypt.hash(instance.password, saltRounds);
  };

  static async validatePassword(instance: User, password: string) {
    return await bcrypt.compare(password, instance.password);
  };
}

export default User