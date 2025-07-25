import { Column, DataType, Table } from 'sequelize-typescript'
import BaseSchema from './_baseModel'

@Table({ tableName: 'experience' })
export default class Experience extends BaseSchema {
  @Column({ allowNull: false, type: DataType.STRING })
  position: string

  @Column({ allowNull: false, type: DataType.STRING })
  organizationName: string

  @Column({ allowNull: false, type: DataType.STRING })
  description: string

  @Column({ allowNull: false, type: DataType.DATE })
  periodeStart: Date

  @Column({ allowNull: true, type: DataType.DATE })
  periodeEnd: Date
}
