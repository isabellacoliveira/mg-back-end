import { AppDataSource } from "../../data-source";
import { Carrinhos_Produtos } from "../entities/CarrinhoProduto";

export const carrinhoProdutoRepository = AppDataSource.getRepository(Carrinhos_Produtos);