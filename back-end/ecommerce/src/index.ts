import 'express-async-errors'
import express from 'express'
import { AppDataSource } from './data-source'
import { errorMiddleware } from './middlewares/error'
import routes from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from './swagger.json'
import cors from 'cors'

const app = express()

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc))


AppDataSource.initialize().then(() => {
	app.use(express.json())
	app.use(cors())
	app.use(routes)

	app.use(errorMiddleware)
	return app.listen(process.env.APP_PORT)
})
