import express, { Router } from 'express'
import { AuthHandler } from '@/controllers/auth/controller'
import { TechStackHandler } from '@/controllers/techstack/controller'
import { ExperienceHandler } from '@/controllers/experience/controller'
import { ProjectHandler } from '@/controllers/project/controller'
import { ContactMeHandler } from '@/controllers/contactme/controller'

const Route: Router = express.Router()

Route.use('/auth', AuthHandler)
Route.use(TechStackHandler)
Route.use(ExperienceHandler)
Route.use(ProjectHandler)
Route.use(ContactMeHandler)

export { Route as v1Route }
