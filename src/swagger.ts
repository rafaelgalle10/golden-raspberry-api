import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Golden Raspberry API',
      version: '1.0.0',
      description: 'API to manage Golden Raspberry Awards nominated and winning films'
    }
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts']
}

const swaggerSpec = swaggerJsdoc(options)

export function setupSwagger (app: Express): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
