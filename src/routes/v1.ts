import express, { Router } from 'express'
import { AuthHandler } from '@/controllers/auth/controller'
import { TechStackHandler } from '@/controllers/techstack/controller'
import { ExperienceHandler } from '@/controllers/experience/controller'

const Route: Router = express.Router()

Route.use('/auth', AuthHandler)
Route.use(TechStackHandler)
Route.use(ExperienceHandler)

export { Route as v1Route }
