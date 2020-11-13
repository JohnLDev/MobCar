import 'reflect-metadata'
import 'dotenv/config'
import './database'
import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'yup'
import cors from 'cors'

import routes from './routes'
import AppError from './errors/AppError'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use(
  (error: Error, request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof ValidationError) {
      return response
        .status(400)
        .json({ errors: error.errors.map(error => error) })
    }
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'client error',
        message: error.message,
      })
    }
    console.error(error)
    return response.status(500).json({ message: 'internal server error' })
  },
)
app.listen(3333, () => {
  console.log('🚀Server started on port 3333!')
})
