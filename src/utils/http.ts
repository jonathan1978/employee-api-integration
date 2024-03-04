import { type Response } from 'express'

export interface CustomError {
  response?: {
    status?: number
  }
  status?: number
  message?: string
}

export const handleError = (error: CustomError | any, res: Response): void => {
  res.status(
    (error.response?.status as number) ??
      (error.status as number) ??
      500
  ).json({
    error: {
      message: error.message ?? 'Internal Server Error'
    }
  })
}
