import asyncHandler from '@/helper/asyncHandler'
import express, { Response, Request, NextFunction } from 'express'
import { TechStackService } from './service'
import HttpResponse from '@/lib/http/HttpResponse'
import authorization from '@/middleware/authorization'
import { FileParams, useMulter } from '@/lib/module/multer'
import _ from 'lodash'

const service = new TechStackService()

const route = express.Router()

const uploadFile = useMulter({
  dest: 'public/uploads',
}).fields([{ name: 'icon', maxCount: 1 }])

const setFileToBody = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const file_upload = req.pickSingleFieldMulter(['icon'])
    req.setBody(file_upload)
    next()
  }
)

route.post(
  '/techstack',
  authorization(),
  uploadFile,
  setFileToBody,
  asyncHandler(async (req: Request, res: Response) => {
    const values = req.getBody()

    const icon = _.get(values, 'icon', {}) as FileParams

    const data = await service.add({
      ...values,
      icon: `${icon.destination.split('/')[1]}/${icon.filename}`,
    })

    const httpResponse = HttpResponse.created({
      message: 'TechStack created successfully',
      data,
    })

    res.status(201).json(httpResponse)
  })
)

route.get(
  '/techstack',
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
  '/techstack/:id',
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
  '/techstack/:id',
  authorization(),
  uploadFile,
  setFileToBody,
  asyncHandler(async (req: Request, res: Response) => {
    const values = req.getBody()

    const id = req.params.id

    const icon = _.get(values, 'icon', {}) as FileParams

    const data = await service.update(id, {
      ...values,
      icon: `${icon.destination.split('/')[1]}/${icon.filename}`,
    })

    const httpResponse = HttpResponse.updated({
      message: 'TechStack updated successfully',
      data,
    })

    res.status(201).json(httpResponse)
  })
)

route.delete(
  '/techstack/:id',
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

export { route as TechStackHandler }
