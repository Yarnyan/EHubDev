import { Experience } from '../../../models/Experience.ts'
import { User } from '../../../models/User.ts'

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