import { Experience } from '../../../models/Experience.ts'

export interface UserData {
  email: string
  name?: string
  phone?: string
  location?: string
  info?: string
  avatar?: string
  specialization?: 'Frontend' | 'Backend'
  exp: Experience
}