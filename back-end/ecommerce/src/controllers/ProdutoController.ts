import { Request, Response } from 'express'
import { AppError } from '../helpers/api-errors'
import { categoriaRepository } from '../database/repositories/categoriaRepository'
import { produtoRepository } from '../database/repositories/produtoRepository'
import { usuarioRepository } from '../database/repositories/usuarioRepository'

export class ProdutoController {
	async criar(req: Request, res: Response) {

		const { nome, descricao, preco, quantidade, imagem, usuario, categorias } = req.body
		
		if (!nome) {
			throw new AppError('O nome do produto é obrigatório', 400)
		}

		const usuarioObj = await usuarioRepository.findOneBy({ id: Number(usuario) })

		if (!usuarioObj) {
			throw new AppError('Usuario não existe', 400)
		}

		for (const Idcategoria of categorias) {
			const categoriaObj = await categoriaRepository.findOneBy({ id: Number(Idcategoria.id) })
			
			if (!categoriaObj) {
				throw new AppError('Categoria não existe', 404)
			}
		}

		const novoProduto = produtoRepository.create({ nome, descricao, preco, quantidade, imagem, usuario, categorias})

		await produtoRepository.save(novoProduto)

		return res.status(201).json(novoProduto)
	}

	async listar(req: Request, res: Response) {
		const produtos = await produtoRepository.find({
			relations: {
				categorias: true,
				usuario: true,
			},
		})

		return res.json(produtos)
	}

	async mostrar(req: Request, res: Response) {
		const id = req.params;
		const produto = await produtoRepository.findOneBy(id)

		if (!produto) {
			throw new AppError('Produto não existe', 404)
		}

		return res.status(201).json(produto);
	}

	async atualizar(req: Request, res: Response) {
		const { id } = req.params;
		
		const { nome, descricao, preco, usuario, quantidade, imagem, categorias } = req.body;

		const usuarioObj = await usuarioRepository.findOneBy({ id: Number(usuario) })

		if (!usuarioObj) {
			throw new AppError('Usuario não existe', 400)
		}

		const produto = await produtoRepository.findOneBy({ id: Number(id) })

		if (!produto) {
			throw new AppError('Produto não existe', 404)
		}

		for (const Idcategoria of categorias) {
			const categoria = await categoriaRepository.findOneBy({ id: Number(Idcategoria.id) })
			if (!categoria) {
				throw new AppError('Categoria não existe', 404)
			}
		}

		const produtoAtualizado = await produtoRepository.save({
			id: Number(id),
			nome: nome,
			descricao: descricao,
			preco: preco,
			imagem: imagem,
			usuario: usuario,
			quantidade: quantidade,
			categorias: categorias
		})

		return res.json(produtoAtualizado)
	}

	async deletar(req: Request, res: Response) {
		const id = req.params;

		const produto = await produtoRepository.findOneBy(id)

		if (!produto) {
			throw new AppError('Produto não existe', 404)
		}

		await produtoRepository.delete(id);

		return res.status(201).json({ message: 'Produto deletado' });
	}
}