import { Column, DataType, Table } from 'sequelize-typescript'
import BaseSchema from './_baseModel'

@Table({ tableName: 'contactme' })
export default class ContactMe extends BaseSchema {
  @Column({ allowNull: false, type: DataType.STRING })
  senderAddress: string

  @Column({ allowNull: false, type: DataType.STRING })
  subject: string

  @Column({ allowNull: false, type: DataType.STRING })
  description: string
}
