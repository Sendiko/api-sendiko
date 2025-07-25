import asyncHandler from '@/helper/asyncHandler'
import express, { Response, Request } from 'express'
import { AuthService } from './service'
import HttpResponse from '@/lib/http/HttpResponse'
import { RoleId } from '@/lib/constant/roleIds'

const service = new AuthService()

const route = express.Router()

route.post(
  '/signin',
  asyncHandler(async (req: Request, res: Response) => {
    const values = req.getBody()

    const data = await service.login({ ...values, RoleId: RoleId.user })

    const httpResponse = HttpResponse.created({
      message: 'Login successfully',
      data,
    })

    res.status(201).json(httpResponse)
  })
)

export { route as AuthHandler }
