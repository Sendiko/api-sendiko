import {
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Table,
} from 'sequelize-typescript'
import BaseSchema from './_baseModel'
import Project from './project'

@Table({ tableName: 'projectTechstack' })
export default class ProjectTechstack extends BaseSchema {
  @Column({ allowNull: false, type: DataType.STRING })
  name: string

  @IsUUID(4)
  @ForeignKey(() => Project)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  ProjectId: string
}
