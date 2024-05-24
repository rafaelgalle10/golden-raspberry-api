import { openDB } from '../database/connection'
import { Movie } from '../models/movie'
import { Result } from '../utils/result'

const PRODUCER_SPLIT_REGEX = process.env.PRODUCER_SPLIT_REGEX || ",| and "

interface interval {
  producer: string
  interval: number
  previousWin: number
  followingWin: number
}

interface ProducerAwardInterval {
  max: interval[]
  min: interval[]
}

export async function getProducersWithMaxMinIntervals (): Promise<Result<ProducerAwardInterval>> {
  const db = await openDB()
  const movies = await db.all<Movie[]>('SELECT * FROM movies WHERE winner = 1')

  const producerWins: { [producer: string]: number[] } = {}

  movies.forEach(movie => {
    movie.producers.split(new RegExp(PRODUCER_SPLIT_REGEX)).forEach(producer => {
      producer = producer.trim()
      if (!producerWins[producer]) {
        producerWins[producer] = []
      }
      producerWins[producer].push(movie.year)
    })
  })

  const producerIntervals: interval[] = []

  Object.keys(producerWins).forEach(producer => {
    const wins = producerWins[producer].sort((a, b) => a - b)
    for (let i = 1; i < wins.length; i++) {
      producerIntervals.push({
        producer,
        interval: wins[i] - wins[i - 1],
        previousWin: wins[i - 1],
        followingWin: wins[i]
      })
    }
  })

  if (producerIntervals.length === 0) {
    return Result.ok({ min: [], max: [] })
  }

  const maxInterval = producerIntervals.reduce((max, current) => current.interval > max.interval ? current : max)
  const minInterval = producerIntervals.reduce((min, current) => current.interval < min.interval ? current : min)

  const maxIntervals = producerIntervals.filter(interval => interval.interval === maxInterval.interval)
  const minIntervals = producerIntervals.filter(interval => interval.interval === minInterval.interval)

  return Result.ok({ min: minIntervals, max: maxIntervals })
}
