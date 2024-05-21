import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import producerRoutes from './routes/producerRoutes'
import { parseCSV } from './utils/csvParser'
import { addMovies } from './services/movieService'
import { errorHandler } from './middlewares/errorHandler'
import { initializeDB } from './database/connection'
import { setupSwagger } from './swagger'

const port = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())
app.use('/api', producerRoutes)
app.use(errorHandler)
setupSwagger(app)

async function startServer (filePath?: string) {
  if (!filePath) filePath = process.env.FILE_PATH || './data/movielist.csv'
  const moviesOrError = await parseCSV(filePath)
  const initOrError = await initializeDB()

  if (!moviesOrError.success) {
    console.error('Initialization Error:', moviesOrError.error?.message)
    process.exit(1)
  }

  if (!moviesOrError.data) {
    console.error('Initialization Error: No movies found')
    process.exit(1)
  }

  if (!initOrError.success) {
    console.error('Initialization Error:', initOrError.error?.message)
    process.exit(1)
  }

  const addedOrError = await addMovies(moviesOrError.data)
  if (!addedOrError.success) {
    console.error('Initialization Error:', addedOrError.error?.message)
    process.exit(1)
  }

  app.listen(port, () => console.log(`Server is running on port ${port}`))
}

if (process.env.JEST_WORKER_ID === undefined) startServer()

export { app, startServer }
