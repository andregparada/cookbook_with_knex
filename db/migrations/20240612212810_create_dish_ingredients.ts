import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('dish_ingredients', (table) => {
    table
      .uuid('dish_id')
      .references('dishes.id')
      .notNullable()
      .onDelete('CASCADE')
    table
      .uuid('ingredient_id')
      .references('ingredients.id')
      .notNullable()
      .onDelete('CASCADE')
    table.primary(['dish_id', 'ingredient_id'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('ingredients')
}
