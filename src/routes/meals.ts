import { z } from 'zod'
import { knex } from '../database'
import { FastifyInstance } from 'fastify'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function mealsRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const createMealBodySchema = z.object({
        name: z.string(),
        description: z.string().optional(),
        direction: z.string(),
        duration: z.number().optional(),
        cost: z.number().optional(),
        servings: z.number().optional(),
        difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
      })
    },
  )
}
