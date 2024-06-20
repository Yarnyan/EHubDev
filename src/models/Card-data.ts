import { Experience } from './Experience.ts'
import { User } from './User.ts'

export interface CardData {
  id: number
  name: string
  description: string
  stack?: string
  repoLink?: string
  pay?: string
  experience?: Experience
  user: User
}