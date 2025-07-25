import { db } from '@/database/databaseConnection'
import { ErrorResponse } from '@/lib/http/ErrorResponse'
import JwtToken from '@/lib/jwtToken'
import { env } from '@/config/env.config'
import { v4 as uuidv4 } from 'uuid'
import { userSchema } from '@/controllers/user/schema'
import { validate } from '@/lib/validate'
import { CreateTechStackType, techStackSchema } from './schema'
import TechStack from '@/database/model/techstack'

const jwt = new JwtToken({ secret: env.JWT_SECRET, expires: env.JWT_EXPIRES })

export class TechStackService {
  async add(formData: CreateTechStackType) {
    const values = techStackSchema.validateSync(formData)

    let data: any

    await db.sequelize!.transaction(async (transaction) => {
      data = await TechStack.create(values, { transaction })
    })

    return data
  }

  async getByPk(id: string): Promise<TechStack> {
    const data = await TechStack.findByPk(id)

    if (!data) throw new ErrorResponse.NotFound('Data not found')

    return data
  }

  async getAll(): Promise<TechStack[]> {
    const data = await TechStack.findAll()

    return data
  }

  async update(id: string, formData: CreateTechStackType) {
    const techstack = await this.getByPk(id)

    const values = techStackSchema.validateSync(formData)

    let data: any

    await db.sequelize!.transaction(async (transaction) => {
      data = await techstack.update(values, { transaction })
    })

    return data
  }

  async delete(id: string): Promise<void> {
    const data = await this.getByPk(id)

    await data.destroy()
  }
}
