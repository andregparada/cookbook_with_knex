import { z } from 'zod'
import { knex } from '../database'
import { FastifyInstance } from 'fastify'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import { randomUUID } from 'node:crypto'

export async function dishesRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const createMealBodySchema = z.object({
        name: z.string(),
        description: z.string().optional(),
        directions: z.string(),
        duration: z.number().optional(),
        cost: z.number().optional(),
        servings: z.number().optional(),
        difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
        ingredients: z.array(z.string()),
      })

      const {
        name,
        description,
        directions,
        duration,
        cost,
        servings,
        difficulty,
        ingredients,
      } = createMealBodySchema.parse(request.body)

      await knex("dishes").insert({
        id: randomUUID(),
        user_id: request.user?.id,
        name,
        description,
        directions,
        duration,
        cost,
        servings,
        difficulty,
      })

      return reply.status(201).send()
    },
  )
}
