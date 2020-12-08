import { Response } from 'express'

export function badRequest(msg: string, res: Response) {
  res.status(400).json({
    message: `Bad Request: ${msg}`
  })
}

export function notFoundError(resource: string, res: Response) {
  res.status(404).json({
    message: `${resource} not found`
  })
}

export function invalidCredentials(res: Response) {
  res.status(401).json({
    message: 'Invalid Credentials'
  })
}

export function unAuthorizedError(msg: string, res: Response) {
  res.status(403).json({
    message: `Unauthorized: ${msg}`
  })
}

export function internalServerError(err: any, res: Response) {
  res.status(500).json({
    message: 'Internal Server Error',
    error: err
  })
}
