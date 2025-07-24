import express, { Response, Request } from 'express'
const route = express.Router()

route.get('/signin', (req: Request, res: Response) => {
  res.send('yes')
})

export { route as AuthHandler }
