import { Specialization } from './Specialization.ts'
import { Experience } from './Experience.ts'

export interface User {
    id: number,
    userType: 'Default' | 'Company'
    username: string
    avatar: string
    phone: string
    description: string
    specialization: Specialization
    experience: Experience
    email: string
    login: string
    hashPassword: string
}