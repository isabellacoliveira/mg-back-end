import { Router } from 'express'
import { CategoriaController } from './controllers/CategoriaController'
import { UsuarioController } from './controllers/UsuarioController'
import { ProdutoController } from './controllers/ProdutoControlle'
import {  permission } from './middlewares/authUsuario'

const routes = Router()

routes.route('/login').post(new UsuarioController().login)

routes
    .route('/usuarios/:id')
    .get(new UsuarioController().mostrar)
    .put(new UsuarioController().atualizar)
    .delete(new UsuarioController().deletar)
    
routes
    .route('/usuarios')
    .post(new UsuarioController().criar)
    .get(new UsuarioController().listar)


routes.use(permission("A"))

    .route('/categorias')
    .post(new CategoriaController().criar)
    .get(new CategoriaController().listar)

routes
    .route('/categorias/:id')
    .get(new CategoriaController().mostrar)
    .put(new CategoriaController().atualizar)
    .delete(new CategoriaController().deletar)

routes
    .route('/produtos')
    .post(new ProdutoController().criar)
    .get(new ProdutoController().listar)

routes
    .route('/produtos/:id')
    .get(new ProdutoController().mostrar)
    .put(new ProdutoController().atualizar)
    .delete(new ProdutoController().deletar)


export default routes
