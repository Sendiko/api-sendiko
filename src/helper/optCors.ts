import cors from 'cors'
import { ErrorResponse } from '@/lib/http/ErrorResponse'
import { allowedCors as allowedOrigin } from '@/lib/constant/allowedCors'

export const optCors: cors.CorsOptions = {
  credentials: true,
  origin: (origin, cb) => {
    console.log('Incoming Origin Header:', origin);
    if (!origin || allowedOrigin.includes(origin)) {
      cb(null, true)
    } else {
      cb(new ErrorResponse.Forbidden('Not allowed'))
    }
  },
}
