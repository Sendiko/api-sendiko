import Project from '@/database/model/project'
import { db } from '@/database/databaseConnection'
import { ErrorResponse } from '@/lib/http/ErrorResponse'
import { CreateProjectType, projectSchema } from './schema'
import ProjectTechstack from '@/database/model/projectTechstack'

export class ProjectService {
  async add(formData: CreateProjectType) {
    const values = projectSchema.validateSync(formData)

    let data: any

    await db.sequelize!.transaction(async (transaction) => {
      data = await Project.create(values, { transaction })

      const projectTechstackFormData: any[] = []

      for (let i = 0; i < formData.techStacks.length; i++) {
        projectTechstackFormData.push({
          name: formData.techStacks[i],
          ProjectId: data.id,
        })
      }

      await ProjectTechstack.bulkCreate(projectTechstackFormData, {
        transaction,
      })
    })

    return data
  }

  async getByPk(id: string): Promise<Project> {
    const data = await Project.findByPk(id, {
      include: [{ model: ProjectTechstack }],
    })

    if (!data) throw new ErrorResponse.NotFound('Data not found')

    return data
  }

  async getAll(): Promise<Project[]> {
    const data = await Project.findAll({
      include: [{ model: ProjectTechstack }],
    })

    return data
  }

  async update(id: string, formData: CreateProjectType) {
    const project = await this.getByPk(id)

    const values = projectSchema.validateSync(formData)

    let data: any

    await db.sequelize!.transaction(async (transaction) => {
      data = await project.update(values, { transaction })

      const projectTechstackFormData: any[] = []

      for (let i = 0; i < formData.techStacks.length; i++) {
        projectTechstackFormData.push({
          name: formData.techStacks[i],
          ProjectId: data.id,
        })
      }

      await ProjectTechstack.destroy({
        where: { ProjectId: data.id },
      })

      await ProjectTechstack.bulkCreate(projectTechstackFormData, {
        transaction,
      })
    })

    return data
  }

  async delete(id: string): Promise<void> {
    const data = await this.getByPk(id)

    await data.destroy()
  }
}
