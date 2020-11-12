import 'reflect-metadata'
import 'dotenv/config'
import './database'
import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'yup'
import cors from 'cors'

import routes from './routes'
import AppError from './errors/AppError'

interface IValidationErrors {
  [key: string]: string[]
}

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use(
  (error: Error, request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof ValidationError) {
      const errors: IValidationErrors = {}
      error.inner.forEach(err => {
        errors[err.path] = err.errors
      })
      return response.status(400).json({ message: 'validation fails', errors })
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
