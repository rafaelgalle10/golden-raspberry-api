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
          producer: "Bo Derek",
          interval: 6,
          previousWin: 1984,
          followingWin: 1990,
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
})
