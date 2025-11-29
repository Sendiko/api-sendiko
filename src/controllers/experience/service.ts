import { db } from '@/database/databaseConnection'
import Experience from '@/database/model/experience'
import { ErrorResponse } from '@/lib/http/ErrorResponse'
import { CreateExperienceType, experienceSchema } from './schema'

export class ExperienceService {
  async add(formData: CreateExperienceType) {
    const values = experienceSchema.validateSync(formData)

    let data: any

    await db.sequelize!.transaction(async (transaction) => {
      data = await Experience.create(values, { transaction })
    })

    return data
  }

  async getByPk(id: string): Promise<Experience> {
    const data = await Experience.findByPk(id)

    if (!data) throw new ErrorResponse.NotFound('Data not found')

    return data
  }

  async getAll(): Promise<Experience[]> {
    const data = await Experience.findAll({
      order: [['periodeStart', 'DESC']],
    })

    return data
  }

  async update(id: string, formData: CreateExperienceType) {
    const experience = await this.getByPk(id)

    const values = experienceSchema.validateSync(formData)

    let data: any

    await db.sequelize!.transaction(async (transaction) => {
      data = await experience.update(values, { transaction })
    })

    return data
  }

  async delete(id: string): Promise<void> {
    const data = await this.getByPk(id)

    await data.destroy()
  }
}
