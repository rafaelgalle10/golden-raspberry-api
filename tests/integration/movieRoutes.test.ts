import request from 'supertest'
import { app, startServer } from '../../src/app'
import { addMovies } from '../../src/services/movieService'
import { Movie } from '../../src/models/movie'
import { resetDB, closeDB, initializeDB } from '../../src/database/connection'

describe('Award Intervals', () => {
  beforeAll(async () => {
    console.log('Server is running in test mode')
    await startServer('./tests/integration/movielist.csv')
  })

  afterAll(async () => {
    await closeDB()
  })

  it('should return producers with max and min award intervals', async () => {
    const response = await request(app).get('/api/producers/award-intervals')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      min: [
        {
          producer: "Joel Silver",
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
      max: [
        {
          producer: "Matthew Vaughn",
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
    })
  })

  it('should return empty arrays if no producers have won multiple awards', async () => {
    const movies: Movie[] = [
      { year: 1980, title: "Movie 1", studios: "Studio 1", producers: "Producer 1", winner: true },
      { year: 1981, title: "Movie 2", studios: "Studio 2", producers: "Producer 2", winner: true }
    ]
    await resetDB()
    await initializeDB()
    await addMovies(movies)
  
    const response = await request(app).get('/api/producers/award-intervals')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ min: [], max: [] })
  })

  it('should return min 1 (Bo and Adam) and max 13 (Bill and Galle)', async () => {
    const movies: Movie[] = [
      { year: 1980, title: "Movie 1", studios: "Studio X", producers: "Bill Cosby", winner: true },
      { year: 1981, title: "Movie 2", studios: "Studio X", producers: "Bo Derek", winner: true },
      { year: 1982, title: "Movie 3", studios: "Studio X", producers: "Bo Derek", winner: true },
      { year: 1983, title: "Movie 4", studios: "Studio X", producers: "Producer 3", winner: true },
      { year: 1984, title: "Movie 5", studios: "Studio X", producers: "Adam Sandler and Rafael Galle", winner: true },
      { year: 1985, title: "Movie 6", studios: "Studio X", producers: "Adam Sandler", winner: true },
      { year: 1986, title: "Movie 7", studios: "Studio X", producers: "Producer 6", winner: true },
      { year: 1987, title: "Movie 8", studios: "Studio X", producers: "Producer 7", winner: true },
      { year: 1988, title: "Movie 9", studios: "Studio X", producers: "Producer 8", winner: true },
      { year: 1989, title: "Movie 10", studios: "Studio X", producers: "Producer 9", winner: true },
      { year: 1990, title: "Movie 11", studios: "Studio X", producers: "Producer 10", winner: true },
      { year: 1991, title: "Movie 12", studios: "Studio X", producers: "Producer 11", winner: true },
      { year: 1992, title: "Movie 13", studios: "Studio X", producers: "Producer 12", winner: true },
      { year: 1993, title: "Movie 14", studios: "Studio X", producers: "Bill Cosby", winner: true },
      { year: 1994, title: "Movie 15", studios: "Studio X", producers: "Producer 14", winner: true },
      { year: 1995, title: "Movie 16", studios: "Studio X", producers: "Producer 15", winner: true },
      { year: 1996, title: "Movie 17", studios: "Studio X", producers: "Producer 16", winner: true },
      { year: 1997, title: "Movie 18", studios: "Studio X", producers: "Rafael Galle", winner: true },
    ]
    await resetDB()
    await initializeDB()
    await addMovies(movies)
  
    const response = await request(app).get('/api/producers/award-intervals')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      min: [
        {
          producer: "Bo Derek",
          interval: 1,
          previousWin: 1981,
          followingWin: 1982,
        },
        {
          producer: "Adam Sandler",
          interval: 1,
          previousWin: 1984,
          followingWin: 1985,
        },
      ],
      max: [
        {
          producer: "Bill Cosby",
          interval: 13,
          previousWin: 1980,
          followingWin: 1993,
        },
        {
          producer: 'Rafael Galle',
          interval: 13,
          previousWin: 1984,
          followingWin: 1997
        }
      ],
    })
  })
})
