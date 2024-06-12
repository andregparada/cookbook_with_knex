import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table
      .uuid('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE')
    table.string('name', 255).notNullable()
    table.string('description', 1024)
    table.text('directions')
    table.integer('duration')
    table.integer('servings')
    table.enum('difficulty', ['easy', 'medium', 'hard'])
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
