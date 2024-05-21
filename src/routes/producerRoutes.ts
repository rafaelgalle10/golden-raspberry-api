import { Router } from 'express'
import { getProducersAwardIntervals } from '../controllers/producerController'

const router = Router()

router.get('/producers/award-intervals', getProducersAwardIntervals)

export default router

/**
 * @swagger
 * /api/producers/award-intervals:
 *   get:
 *     summary: Returns producers with the longest and shortest intervals between consecutive awards
 *     tags: [Producers]
 *     responses:
 *       200:
 *         description: List of producers with award ranges
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 max:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       producer:
 *                         type: string
 *                       interval:
 *                         type: integer
 *                       previousWin:
 *                         type: integer
 *                       followingWin:
 *                         type: integer
 *                 min:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       producer:
 *                         type: string
 *                       interval:
 *                         type: integer
 *                       previousWin:
 *                         type: integer
 *                       followingWin:
 *                         type: integer
 */
