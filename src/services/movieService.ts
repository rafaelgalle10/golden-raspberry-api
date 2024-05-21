import { openDB } from '../database/connection'
import { Movie } from '../models/movie'
import { AppError } from '../utils/error'
import { Result } from '../utils/result'

export async function addMovies (movies: Movie[]): Promise<Result<Movie[]>> {
  const winnersByYear: { [year: number]: boolean } = {}
  const addedMovies: Movie[] = []

  for (const movie of movies) {
    const validationErrors = validateMovie(movie)
    if (validationErrors.length > 0) {
      return Result.fail(new AppError.CSVInvalid(validationErrors.join(', ')))
    }

    if (process.env.VALIDATE_MULTIPLE_WINNERS === 'true' && movie.winner) {
      if (winnersByYear[movie.year]) {
        return Result.fail(new AppError.CSVInvalid(`Multiple winners for year ${movie.year}`))
      }
      winnersByYear[movie.year] = true
    }
  }

  for (const movie of movies) {
    const movieOrError = await addMovie(movie)
    if (!movieOrError.success && movieOrError.error) {
      return Result.fail(movieOrError.error)
    }
    if (movieOrError.data) addedMovies.push(movieOrError.data)
  }
  return Result.ok(addedMovies)
}

export async function addMovie (movie: Movie): Promise<Result<Movie>> {
  const db = await openDB()

  const validationErrors = validateMovie(movie)
  if (validationErrors.length > 0) return Result.fail(new AppError.CSVInvalid(validationErrors.join(', ')))

  const insertMovie = `
    INSERT INTO movies (year, title, studios, producers, winner) 
    VALUES (?, ?, ?, ?, ?);
  `
  const result = await db.run(insertMovie, [
    movie.year,
    movie.title,
    movie.studios,
    movie.producers,
    movie.winner
  ])
  return Result.ok({ id: result.lastID, ...movie })
}

function validateMovie (movie: Movie): string[] {
  const errors: string[] = []
  if (!movie.year || isNaN(movie.year)) errors.push('Year is invalid or missing.')
  if (!movie.title) errors.push('Title is missing.')
  if (!movie.producers) errors.push('Producers are missing.')
  if (typeof movie.winner !== 'boolean') errors.push('Winner is invalid or missing.')
  return errors
}
