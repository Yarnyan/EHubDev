import styles from './card.module.scss'
import { Experience } from '../../../../models/Experience.ts'
import { experienceConverter } from '../../../../utils/helpers/experience-converter.ts'
import DeleteIcon from '@mui/icons-material/Delete';
interface CardProps {
  name: string
  description: string
  stack?: string
  repositoryLink?: string
  Pay?: string
  experience?: Experience
}

export const Card = ({ name, Pay, description, experience, repositoryLink, stack }: CardProps) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p className={styles.description}>{description}</p>
      {stack && <div className={styles.item}>Стек: <p>{stack}</p></div>}
      {repositoryLink && <div className={styles.item}>Ссылка на репозиторий:
        <a href={repositoryLink}>{repositoryLink}</a>
      </div>}
      {experience && <div className={styles.item}>Требуемый опыт:
        <p>{experienceConverter(Experience[experience])}</p>
      </div>
      }
      {Pay && <div className={styles.item}>Зарплата:
        <p>{Pay}р.</p>
      </div>
      }
      <div className={styles.trashContainer}>
        <button className={styles.delete}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  )
}