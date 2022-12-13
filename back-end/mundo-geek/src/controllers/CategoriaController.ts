import { Request, Response } from 'express'
import { AppError } from '../helpers/api-errors'
import { categoriaRepository } from '../database/repositories/categoriaRepository'

export class CategoriaController {
	async criar(req: Request, res: Response) {
		const { titulo } = req.body

		if (!titulo) {
			throw new AppError('O título da categoria é obrigatório', 400)
		}

		const tituloExiste = await categoriaRepository.findOneBy({ titulo })

		if(tituloExiste) {
			throw new AppError('Categoria já cadastrada', 400)
		}

		const novaCategoria = categoriaRepository.create({ titulo })

		await categoriaRepository.save(novaCategoria)

		return res.status(201).json(novaCategoria)
	}

	async listar(req: Request, res: Response) {
		const categorias = await categoriaRepository.find()

		return res.status(201).json(categorias);
	}

	async mostrar(req: Request, res: Response) {
		const id = req.params;

		const categoria = await categoriaRepository.findOneBy(id)

		if (!categoria) {
			throw new AppError('Categoria não existe', 404)
		}

		return res.status(201).json(categoria);
	}

	async atualizar(req: Request, res: Response) {
		const id = req.params;
		const { titulo } = req.body;

		const idCategoria = await categoriaRepository.findOneBy(id)

		if (!idCategoria) {
			throw new AppError('Categoria não existe', 404)
		}

		await categoriaRepository.update(id, {
			titulo
		});

		const novaCategoria = await categoriaRepository.findOneBy(id)

		return res.status(201).json(novaCategoria);
	}

	async deletar(req: Request, res: Response) {
		const id = req.params;

		const idCategoria = await categoriaRepository.findOneBy(id)

		if (!idCategoria) {
			throw new AppError('Categoria não existe', 404)
		}

		await categoriaRepository.delete(id);

		return res.status(201).json({ message: 'Categoria deletada' });
	}
}