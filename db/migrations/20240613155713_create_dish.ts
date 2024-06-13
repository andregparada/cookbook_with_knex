import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('dishes', (table) => {
    table.uuid('id').primary()
    table
      .uuid('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE')
    table.string('name', 255).notNullable()
    table.string('description', 1024)
    table.text('directions').notNullable()
    table.integer('duration')
    table.decimal('cost', 10, 2)
    table.integer('servings')
    table.enu('difficulty', ['easy', 'medium', 'hard'])
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('dishes')
}
