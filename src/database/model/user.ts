import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  DefaultScope,
  Scopes,
  Table,
  Unique,
} from 'sequelize-typescript'
import Hashing from '@/config/hash.config'
import BaseSchema from './_baseModel'

const hashing = new Hashing()

@DefaultScope(() => ({
  attributes: {
    exclude: ['password'],
  },
}))
@Scopes(() => ({
  withPassword: {},
}))
@Table({ tableName: 'user' })
export default class User extends BaseSchema {
  @Column({ allowNull: false, type: DataType.STRING })
  fullname: string

  @Unique
  @Column({ allowNull: false, type: DataType.STRING })
  email: string

  @Column({ type: DataType.STRING })
  password?: string

  @Column({ type: DataType.VIRTUAL })
  newPassword: string

  @Column({ type: DataType.VIRTUAL })
  confirmNewPassword: string

  comparePassword: (current_password: string) => Promise<boolean>

  @BeforeUpdate
  @BeforeCreate
  static async setUserPassword(instance: User): Promise<void> {
    const { newPassword } = instance

    if (newPassword) {
      const hash = await hashing.hash(instance.newPassword)
      instance.setDataValue('password', hash)
    }
  }
}

// compare password
User.prototype.comparePassword = async function (
  current_password: string
): Promise<boolean> {
  const password = String(this.password)

  const compare = await hashing.verify(password, current_password)
  return compare
}
