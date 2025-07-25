import { Column, DataType, HasMany, Table } from 'sequelize-typescript'
import BaseSchema from './_baseModel'
import ProjectTechstack from './projectTechstack'

@Table({ tableName: 'project' })
export default class Project extends BaseSchema {
  @Column({ allowNull: false, type: DataType.STRING })
  title: string

  @Column({ allowNull: false, type: DataType.STRING })
  description: string

  @Column({ allowNull: false, type: DataType.STRING })
  imagePreview: string

  @HasMany(() => ProjectTechstack)
  projectTechstack: ProjectTechstack[]
}
