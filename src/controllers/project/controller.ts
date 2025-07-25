import asyncHandler from '@/helper/asyncHandler'
import express, { Response, Request, NextFunction } from 'express'
import { ProjectService } from './service'
import HttpResponse from '@/lib/http/HttpResponse'
import authorization from '@/middleware/authorization'
import { FileParams, useMulter } from '@/lib/module/multer'
import _ from 'lodash'
import { ParseStringToArray } from '@/lib/jsonParse'

const service = new ProjectService()

const route = express.Router()

const uploadFile = useMulter({
  dest: 'public/uploads',
}).fields([{ name: 'imagePreview', maxCount: 1 }])

const setFileToBody = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const file_upload = req.pickSingleFieldMulter(['imagePreview'])
    req.setBody(file_upload)
    next()
  }
)

route.post(
  '/project',
  authorization(),
  uploadFile,
  setFileToBody,
  asyncHandler(async (req: Request, res: Response) => {
    const values = req.getBody()

    const imagePreview = _.get(values, 'imagePreview', {}) as FileParams

    const data = await service.add({
      ...values,
      techStacks: ParseStringToArray(values.techStacks),
      imagePreview: `${imagePreview.destination}/${imagePreview.filename}`,
    })

    const httpResponse = HttpResponse.created({
      message: 'Project created successfully',
      data,
    })

    res.status(201).json(httpResponse)
  })
)

route.get(
  '/project',
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
  '/project/:id',
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
  '/project/:id',
  authorization(),
  uploadFile,
  setFileToBody,
  asyncHandler(async (req: Request, res: Response) => {
    const values = req.getBody()

    const id = req.params.id

    const imagePreview = _.get(values, 'imagePreview', {}) as FileParams

    const data = await service.update(id, {
      ...values,
      techStacks: ParseStringToArray(values.techStacks),
      imagePreview: `${imagePreview.destination}/${imagePreview.filename}`,
    })

    const httpResponse = HttpResponse.updated({
      message: 'Project updated successfully',
      data,
    })

    res.status(201).json(httpResponse)
  })
)

route.delete(
  '/project/:id',
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

export { route as ProjectHandler }
