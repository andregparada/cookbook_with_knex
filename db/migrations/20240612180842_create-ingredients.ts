import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('ingredients', (table) => {
    table.uuid('id').primary()
    table.string('name', 255).notNullable()
    table.decimal('price')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('ingredients')
}
