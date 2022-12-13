import { Usuario } from "../database/entities/Usuario";

declare global {
    namespace Express {
        export interface Request {
            usuario: Partial<Usuario>
        }
    }
}