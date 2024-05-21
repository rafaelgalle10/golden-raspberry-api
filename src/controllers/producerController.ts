import { Request, Response } from 'express'
import { getProducersWithMaxMinIntervals } from '../services/producerService'

export async function getProducersAwardIntervals (req: Request, res: Response) {
  const result = await getProducersWithMaxMinIntervals()
  res.status(200).json(result.data)
}
