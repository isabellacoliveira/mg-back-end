import { Request, Response } from "express";
import { carrinhoProdutoRepository } from "../database/repositories/carrinhoProdutoRepository";
import { AppError } from "../helpers/api-errors";

export default class CarrinhoProdutoController{
    async deletar(req: Request, res: Response) {
		const id = req.params;
		try{
            const carrinho_produto = await carrinhoProdutoRepository.findOneBy(id);
            if (!carrinho_produto) {
                throw new AppError('Item não existe', 404);
            }

            await carrinhoProdutoRepository.delete(id);

            return res.status(201).json({ message: 'Item deletado' });
        }catch (error) {
            
            console.error(error)
         }

		
	}
}