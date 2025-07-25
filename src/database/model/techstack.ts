import { Column, DataType, Table } from 'sequelize-typescript'
import BaseSchema from './_baseModel'

@Table({ tableName: 'techstack' })
export default class TechStack extends BaseSchema {
  @Column({ allowNull: false, type: DataType.STRING })
  title: string

  @Column({ allowNull: false, type: DataType.STRING })
  description: string

  @Column({ allowNull: false, type: DataType.STRING })
  icon: string
}
