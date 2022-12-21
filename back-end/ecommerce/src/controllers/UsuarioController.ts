import { Request, Response } from 'express'
import { AppError } from '../helpers/api-errors'
import { usuarioRepository } from '../database/repositories/usuarioRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UsuarioController {
	async criar(req: Request, res: Response) {
		const { nome, sobrenome, email, senha, role } = req.body

		const usuarioExiste = await usuarioRepository.findOneBy({ email })

		if(usuarioExiste) {
			throw new AppError('E-mail já cadastrado', 400)
		}

		const hashSenha = await bcrypt.hash(senha, 10)

		const novoUsuario = usuarioRepository.create({         
			nome,
			sobrenome,
			email,
			senha: hashSenha,
			role 
		})

		await usuarioRepository.save(novoUsuario)

		return res.status(201).json(novoUsuario)
	}

	async mostrar(req: Request, res: Response) {
		const id = req.params;
		const usuario = await usuarioRepository.findOneBy(id)

		if (!usuario) {
			throw new AppError('Usuario não existe', 404)
		}

		return res.status(201).json(usuario);
	}

	async atualizar(req: Request, res: Response) {
		const id = req.params;

		const { nome, sobrenome, email, senha, role } = req.body;
		const usuario = usuarioRepository.findOneBy(id)

		if (!usuario) {
			throw new AppError('Usuario não existe', 404)
		}

		await usuarioRepository.update(id, {
			nome,
			sobrenome,
			email,
			senha,
			role 
		});

		const novousuario = usuarioRepository.findOneBy(id)

		return res.status(201).json(await novousuario);
	}

	async deletar(req: Request, res: Response) {
		const id = req.params;
		const usuario = await usuarioRepository.findOneBy(id)

		if (!usuario) {
			throw new AppError('Usuario não existe', 404)
		}

		await usuarioRepository.delete(id);

		return res.status(201).json({ message: 'Usuario deletado' });
	}

	async listar(req: Request, res: Response) {
		try {
			const usuario = await usuarioRepository.find()

			return res.json(usuario)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	async login(req: Request, res: Response) {
		const { email, senha } = req.body;

		const usuario = await usuarioRepository.findOneBy({ email })

		if(!usuario) {
			throw new AppError('E-mail ou senha invalidos', 404)
		}

		const verificaSenha = await bcrypt.compare(senha, usuario.senha)

		if(!verificaSenha) {
			throw new AppError('E-mail ou senha invalidos', 404)
		}

		const token = jwt.sign({ id: usuario.id, role: usuario.role }, process.env.JWT_PASS ?? '', {
			expiresIn: '4d',
		})

		const { senha:_, ...usuariologin } = usuario

		return res .json({
			usuario: usuariologin,
			token: token,
		})
	}
}