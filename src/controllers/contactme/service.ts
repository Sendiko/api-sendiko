import { db } from '@/database/databaseConnection'
import ContactMe from '@/database/model/contactMe'
import { ErrorResponse } from '@/lib/http/ErrorResponse'
import { CreateContactMeType, contactMeSchema } from './schema'
import { MailSmpt } from '@/lib/module/MailSmtp'

export class ContactMeService {
  async add(formData: CreateContactMeType) {
    const values = contactMeSchema.validateSync(formData)

    let data: any

    await db.sequelize!.transaction(async (transaction) => {
      data = await ContactMe.create(values, { transaction })
    })

    await MailSmpt.sendMail(
      formData.senderAddress,
      formData.subject,
      formData.description
    )

    return data
  }

  async getByPk(id: string): Promise<ContactMe> {
    const data = await ContactMe.findByPk(id)

    if (!data) throw new ErrorResponse.NotFound('Data not found')

    return data
  }

  async getAll(): Promise<ContactMe[]> {
    const data = await ContactMe.findAll()

    return data
  }

  async delete(id: string): Promise<void> {
    const data = await this.getByPk(id)

    await data.destroy()
  }
}
