// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      hashed_password: string
      created_at: string
      updated_at: string
      session_id?: string
    }
    dishes: {
      id: string
      user_id: string
      name: string
      description?: string
      directions: string
      duration?: number
      cost?: number
      servings?: number
      difficulty?: 'easy' | 'medium' | 'hard'
      updated_at: string
      created_at: string
    }
    ingredients: {
      id: string
      name: string
      price: number
    }
    dish_ingredients: {
      dish_id: string
      ingredient_id: string
    }
  }
}
