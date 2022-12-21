import { Router } from 'express'
import { CategoriaController } from './controllers/CategoriaController'
import { UsuarioController } from './controllers/UsuarioController'
import { ProdutoController } from './controllers/ProdutoController'
import {  permission } from './middlewares/authUsuario'
import CarrinhoController from './controllers/CarrinhoController'
import CarrinhoProdutoController from './controllers/CarrinhoProdutoController'

const routes = Router()

routes.route('/login').post(new UsuarioController().login)

routes.route('/produtos').get(new ProdutoController().listar)
routes.route('/categorias').get(new CategoriaController().listar)

routes
    .route('/usuarios/:id')
    .get(new UsuarioController().mostrar)
    .put(new UsuarioController().atualizar)
    .delete(new UsuarioController().deletar)
    
routes
    .route('/usuarios')
    .post(new UsuarioController().criar)
    .get(new UsuarioController().listar)

routes
    .route('/carrinhoproduto/:id')
    .delete(new CarrinhoProdutoController().deletar)
    
routes
    .route('/carrinhos')
    .post(new CarrinhoController().criar)
    .get(new CarrinhoController().listar)


routes.use(permission("admin"))

    .route('/categorias')
    .post(new CategoriaController().criar)

routes
    .route('/categorias/:id')
    .get(new CategoriaController().mostrar)
    .put(new CategoriaController().atualizar)
    .delete(new CategoriaController().deletar)

routes
    .route('/produtos')
    .post(new ProdutoController().criar)

routes
    .route('/produtos/:id')
    .get(new ProdutoController().mostrar)
    .put(new ProdutoController().atualizar)
    .delete(new ProdutoController().deletar)


export default routes
