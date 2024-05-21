import fs from 'fs'
import { parse } from 'csv-parse'
import { Movie } from '../models/movie'
import { Result } from '../utils/result'
import { AppError } from '../utils/error'

export function parseCSV (filePath: string): Promise<Result<Movie[]>> {
  return new Promise((resolve, reject) => {
    const movies: Movie[] = []
    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: process.env.DELIMITER || ';', columns: true }))
      .on('data', async (row) => {
        const movie: Movie = {
          year: parseInt(row.year),
          title: row.title,
          studios: row.studios,
          producers: row.producers,
          winner: row.winner?.toLowerCase() === 'yes'
        }
        movies.push(movie)
      })
      .on('end', () => {
        if (movies.length > 0) {
          resolve(Result.ok(movies))
        } else {
          resolve(Result.fail(new AppError.CSVEmpty()))
        }
      })
      .on('error', (err) => {
        resolve(Result.fail(new AppError.ParseCSV(err.toString())))
      })
  })
}
