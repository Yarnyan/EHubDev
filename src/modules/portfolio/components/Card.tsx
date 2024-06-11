import styles from './card.module.scss'
import { Experience } from '../../../models/Experience.ts'

interface CardProps {
  name: string
  description: string
  stack?: string
  repositoryLink?: string
  salary?: string
  experience?: Experience
}

export const Card = ({ name, salary, description, experience, repositoryLink, stack }: CardProps) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p className={styles.description}>{description}</p>
      {stack && <div className={styles.item}>Стек: <p>{stack}</p></div>}
      {repositoryLink && <div className={styles.item}>Ссылка на репозиторий:
        <a href={repositoryLink}>{repositoryLink}</a>
      </div>}
      {experience && <div className={styles.item}>Требуемый опыт:
        <p>{experience}</p>
      </div>
      }
      {salary && <div className={styles.item}>Зарплата:
        <p>{salary}р.</p>
      </div>
      }
    </div>
  )
}