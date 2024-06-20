import { Experience } from './Experience.ts'

export interface IVacancy {
    id: number,
    name: string,
    description: string,
    pay: number,
    experience: Experience
    userId: number
}