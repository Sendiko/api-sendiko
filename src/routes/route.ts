import express, { Router } from 'express'
import v1Routes from './v1'

const Route: Router = express.Router()

Route.use('/v1', v1Routes)

export default Route
