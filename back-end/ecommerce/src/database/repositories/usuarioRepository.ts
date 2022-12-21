import { AppDataSource } from "../../data-source";
import { Usuario } from "../entities/Usuario";

export const usuarioRepository = AppDataSource.getRepository(Usuario)
.extend(
    {findById(id: number){
    const usuario = this.findOne({
        where: {
            id
        }
    })
    return usuario;
}});