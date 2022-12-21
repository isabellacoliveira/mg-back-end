import { In } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Produto } from "../entities/Produto";

interface IProcuraProduto {
    id: number;
  }

export const produtoRepository = AppDataSource.getRepository(Produto)
.extend({
    async findAllByIds(produtos: IProcuraProduto[]) {
        const produtoIds = produtos.map(produto => produto.id);
    
        const produtosExistentes = await this.find({
          where: {
            id: In(produtoIds),
          },
        });
    
        return produtosExistentes;
    }
});