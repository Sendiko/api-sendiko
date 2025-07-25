import authorization from '@/middleware/authorization'
import express, { Response, Request } from 'express'
import HttpResponse from '@/lib/http/HttpResponse'
import asyncHandler from '@/helper/asyncHandler'
import { ExperienceService } from './service'
import _ from 'lodash'

const service = new ExperienceService()

const route = express.Router()

route.post(
  '/experience',
  authorization(),
  asyncHandler(async (req: Request, res: Response) => {
    const values = req.getBody()

    const data = await service.add(values)

    const httpResponse = HttpResponse.created({
      message: 'Experience created successfully',
      data,
    })

    res.status(201).json(httpResponse)
  })
)

route.get(
  '/experience',
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
  '/experience/:id',
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

route.put(
  '/experience/:id',
  authorization(),
  asyncHandler(async (req: Request, res: Response) => {
    const values = req.getBody()

    const id = req.params.id

    const data = await service.update(id, values)

    const httpResponse = HttpResponse.updated({
      message: 'Experience updated successfully',
      data,
    })

    res.status(201).json(httpResponse)
  })
)

route.delete(
  '/experience/:id',
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

export { route as ExperienceHandler }
