import { AppDataSource } from "../../data-source";
import { Carrinho} from "../entities/Carrinho";
import { Usuario } from "../entities/Usuario";

interface IProduto {
    produto_id: number;
    preco: number;
    qtdProduto: number;
  }
  


  interface IRequest {
    usuario: Usuario;
    produtos: IProduto[];
    compraFinalizada: boolean
  }

export const carrinhoRepository = AppDataSource.getRepository(Carrinho)
.extend({
    async create({ usuario, produtos, compraFinalizada}: IRequest){
    try{
        const carrinho = this.create({
            usuario,
            carrinhos_produtos: produtos,
            compraFinalizada
        });
        await this.save(carrinho);
        
        return carrinho;

    }catch(exception){
        console.log(exception)
    }
}}
)
.extend({
    findById(id: number) {
        const carrinho = this.findOne({
            where: {
              id: id,
          },
          relations: {
              usuario: true,
              carrinhos_produtos: true
          }
          });
    
        return carrinho;
    }
})
