import styles from './Card.module.scss'
import { useNavigate } from 'react-router-dom'
import { formatText } from '../helpers/format-text.ts'
import { Experience } from '../../../models/Experience.ts'
import { experienceConverter } from '../../../utils/helpers/experience-converter.ts'
import { Specialization } from '../../../models/Specialization.ts'
import { useLazyGetUserByIdQuery } from '../../../api/user-api.ts'
interface Card {
  name: string
  description: string | null
  experience: Experience
  userId: number
  specialization: Specialization
}

const Card = ({ name, description, experience, specialization, userId }: Card) => {
  const navigate = useNavigate()
  const [getUserById] = useLazyGetUserByIdQuery()
  const getExpertiseClass = (exp: Experience) => {
    if (exp <= 1) {
      return styles.expertisePurple
    } else if (exp === 2) {
      return styles.expertiseYellow
    } else {
      return styles.expertiseRed
    }
  }



  const handleRedirect = () => {
    navigate('/profile/' + userId)
  }

  return (
    <div className={styles.container}>
      <div className={styles.subtitle}>
        <p onClick={handleRedirect}>{name}</p>
        <p>{specialization}</p>
      </div>
      <div className={styles.description}>
        <p>{formatText(description)}</p>
      </div>
      <div className={styles.expertise}>
        <div className={styles.ff}>
          <div className={`${styles.indicator} ${getExpertiseClass(experience)}`}></div>
          <p>{experienceConverter(Experience[experience])}</p>
        </div>
      </div>
    </div>
  )
}

export default Card