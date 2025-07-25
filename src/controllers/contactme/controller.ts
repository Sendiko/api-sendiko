import authorization from '@/middleware/authorization'
import express, { Response, Request } from 'express'
import HttpResponse from '@/lib/http/HttpResponse'
import asyncHandler from '@/helper/asyncHandler'
import { ContactMeService } from './service'
import _ from 'lodash'

const service = new ContactMeService()

const route = express.Router()

route.post(
  '/contact-me',
  asyncHandler(async (req: Request, res: Response) => {
    const values = req.getBody()

    const data = await service.add(values)

    const httpResponse = HttpResponse.created({
      message: 'Email sended successfully',
      data,
    })

    res.status(201).json(httpResponse)
  })
)

route.get(
  '/contact-me',
  asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getAll()

    const httpResponse = HttpResponse.get({
      message: 'Success get data',
      data,
    })

    res.status(201).json(httpResponse)
  })
)

route.get(
  '/contact-me/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id

    const data = await service.getByPk(id)

    const httpResponse = HttpResponse.get({
      message: 'Success get data',
      data,
    })

    res.status(201).json(httpResponse)
  })
)

route.delete(
  '/contact-me/:id',
  authorization(),
  asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id

    const data = await service.delete(id)

    const httpResponse = HttpResponse.deleted({
      message: 'Data deleted successfully',
    })

    res.status(201).json(httpResponse)
  })
)

export { route as ContactMeHandler }
