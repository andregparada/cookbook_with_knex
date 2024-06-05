import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import { hash } from 'bcryptjs'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    const { name, email, password } = createUserBodySchema.parse(request.body)

    const userByEmail = await knex('users').where({ email }).first()

    if (userByEmail) {
      return reply.status(400).send({ message: 'User already exists' })
    }

    const hashedPassword = await hash(password, 6)

    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      password: hashedPassword,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })

  app.put(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const paramsSchema = z.object({ id: z.string().uuid() })

      const { id } = paramsSchema.parse(request.params)

      const updatedUserBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      })

      const { name, email, password } = updatedUserBodySchema.parse(
        request.body,
      )

      const hashedPassword = await hash(password, 6)

      const user = await knex('users').where({ id }).first()

      if (!user) {
        return reply.status(404).send({ error: 'User not found' })
      }

      await knex('users').where({ id }).update({
        name,
        email,
        password: hashedPassword,
      })

      return reply.status(204).send()
    },
  )
}
