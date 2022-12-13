import { NextFunction, Request, Response } from "express";
import { usuarioRepository } from "../database/repositories/usuarioRepository";
import { AppError } from "../helpers/api-errors";
import jwt from 'jsonwebtoken'
import { Usuario } from "../database/entities/Usuario";

interface TokenPayload {
	id: number
}

async function decoder(req: Request): Promise<Usuario | undefined> {

    const authorization = req.headers.authorization || "";
  
    const [, token] = authorization.split(' ');
    const payload = jwt.verify(token, process.env.JWT_PASS ?? '')
    const { id } = payload as TokenPayload;
    const usuario = await usuarioRepository.findOne({ where: { id: id} })

    if(!usuario) {
        throw new AppError("Você não possui permissão", 401)    
    }

    const { senha:_, ...usuariologin } = usuario
        
    req.usuario = usuariologin
    
    return usuario;
}

export const permission = (permissions: String) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usuario = await decoder(req);

            if(!usuario) {
                throw new AppError('Não autorizado', 401) 
            }

            if(permissions.includes(usuario.role)) {
                return next();
            };
          
            return res.status(401).json("Você não possui permissão")
        } catch (error) {
            return res.status(401).json("Você não possui permissão")
        }
    }
}


