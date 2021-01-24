export interface User {
  id: string
  username: string
  password: string
  email: string
  type: 'free' | 'premium' | 'gifted_premium'
  createdAt: Date
  updatedAt: Date
  workouts: Workout[]
}

export interface Workout {
  id?: string
  name: string
  description: string
  type: number
  difficulty: number
  duration: number
  blocks: Block[]
  createdAt?: Date
  updatedAt?: Date
  user?: User
}

export interface Block {
  id: string
  type: string
  exercises: Exercise[]
  values: any[]
}

export interface Exercise {
  id: string
  name: string
  count: number
  append: 'x' | 's'
  info: string
}
