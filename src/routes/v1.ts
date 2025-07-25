import express, { Router } from 'express'
import { AuthHandler } from '@/controllers/auth/controller'
import { TechStackHandler } from '@/controllers/techstack/controller'

const Route: Router = express.Router()

Route.use('/auth', AuthHandler)
Route.use(TechStackHandler)

export { Route as v1Route }
