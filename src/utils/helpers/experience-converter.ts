import { Experience } from '../../models/Experience.ts'

export const experienceConverter = (exp: Experience) => {
  switch (exp) {
    case Experience.Intern: return 'Нет опыта'
    case Experience.Junior: return 'До года'
    case Experience.Middle: return 'От 1 года до трех'
    case Experience.Senior: return '3 и более лет'
  }
}
