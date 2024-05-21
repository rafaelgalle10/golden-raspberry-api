import { Request, Response, NextFunction } from 'express'

export function errorHandler (err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err)
  const error = {
    success: false,
    message: 'Internal Server Error',
    error: err.message
  }
  if (process.env.ENVIRONMENT !== 'DEV') delete error.error
  res.status(500).json(error)
}
