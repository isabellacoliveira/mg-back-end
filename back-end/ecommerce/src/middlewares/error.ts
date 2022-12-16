import { NextFunction, Request, Response } from 'express'
import { AppError } from '../helpers/api-errors'

export const errorMiddleware = (
    error: Error & Partial<AppError>,
    req: Request,
    res: Response, 
    next: NextFunction
) => {
	const statusCode = error.statusCode ?? 500
    const message = error.statusCode ? error.message : 'Erro interno no servidor'
    return res.status(statusCode).json({ message })
}