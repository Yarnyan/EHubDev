import { Experience } from '../../../models/Experience.ts'
import { User } from '../../../models/User.ts'

export interface UserData extends User{
  email: string
  name?: string
  phone?: string
  location?: string
  info?: string
  avatar?: string
  specialization?: 'Frontend' | 'Backend'
  exp?: Experience
}