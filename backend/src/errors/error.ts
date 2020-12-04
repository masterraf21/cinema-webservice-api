import { Response } from 'express'

export function badRequest(msg: string, res: Response) {
  res.status(400).json({
    message: `Bad Request: ${msg}`
  })
}

export function notFoundError(notFound: string, res: Response) {
  res.status(404).json({
    message: `${notFound} not found`
  })
}

export function invalidCredentials(res: Response) {
  res.status(401).json({
    message: 'Invalid Credentials'
  })
}

export function unAuthorizedError(res: Response) {
  res.status(403).json({
    message: 'UnAuthorized Error',
    error: 'Access Denied'
  })
}

export function internalServerError(err: any, res: Response) {
  res.status(500).json({
    message: 'Internal Server Error',
    error: err
  })
}
