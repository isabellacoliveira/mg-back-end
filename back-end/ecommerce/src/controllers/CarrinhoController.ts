import { carrinhoRepository } from '../database/repositories/carrinhoRepository'
import { Request, Response } from 'express';
import { AppError } from '../helpers/api-errors';
import { usuarioRepository } from '../database/repositories/usuarioRepository';
import { produtoRepository } from '../database/repositories/produtoRepository';


export default class CarrinhoController {
  public async listar(req: Request, res: Response) {
    
    const { id } = req.params;

    const carrinho = await carrinhoRepository.findById(Number(id));

    if (!carrinho) {
      throw new AppError('Carrinho não encontrado!', 400);
    }

    return res.json(carrinho);
  }

  public async criar(req: Request, res: Response) {
    const { usuario, produtos } = req.body;

    const usuarioExiste = await usuarioRepository.findById(usuario);
    if(!usuarioExiste) {
      throw new AppError("Usuário não existe", 400);
    }

    const produtoExiste = await produtoRepository.findAllByIds(produtos);
    if (!produtoExiste.length) {
      throw new AppError('Não foi possível achar nenhum produto.', 400);
    }

    const quantidadeDisponivel = produtos.filter((produto: { quantidade: number; }) =>
      produtoExiste[0].quantidade >= produto.quantidade,
    );

    if (!quantidadeDisponivel.length) {
      throw new AppError('Quantidade não disponivel!', 400);
    }

    const produtosSerializados = produtos.map((produto: { id: number; quantidade: number; }) => ({
      produto_id: produto.id,
      qtdProduto: produto.quantidade,
      preco: produtoExiste.filter(p => p.id === produto.id)[0].preco,
    }));

    const carrinho = carrinhoRepository.create({
      usuario: usuario,
      carrinhos_produtos: produtosSerializados,
      compraFinalizada: true
    }); 

    await carrinhoRepository.save(carrinho);


    const updatedProdutoQuantidade = produtos.map((produto: { produto_id: number; id: number; quantidade: number; }) => ({
      id: produto.id,
      quantidade:
      produtoExiste.filter(p => p.id === produto.id)[0].quantidade - produto.quantidade,
    }));


    await produtoRepository.save(updatedProdutoQuantidade);

    return res.json(carrinho);

  }

}