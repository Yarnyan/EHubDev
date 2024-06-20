import { useDispatch } from 'react-redux'
import { setActiveId } from '../../../store/reducers/chat-slise'
import styles from './Card.module.scss'
import { useNavigate } from 'react-router-dom'
import { formatText } from '../helpers/format-text.ts'
import { IVacancy } from '../../../models/Vacancy.ts'
import { experienceConverter } from '../../../utils/helpers/experience-converter.ts'
import { Experience } from '../../../models/Experience.ts'
import { useLazyGetUserByIdQuery } from '../../../api/user-api.ts'
const Order = ({ name, description, experience, pay, userId }: IVacancy) => {
  const [getUserById] = useLazyGetUserByIdQuery()

  const getExpertiseClass = (years: string) => {
    const numYears = parseInt(years.split(' ')[0])
    if (numYears < 5) {
      return styles.expertisePurple
    } else if (numYears < 10) {
      return styles.expertiseYellow
    } else {
      return styles.expertiseRed
    }
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRedirect = () => {
    getUserById({ token: localStorage.getItem('token')!, params: 'Id=' + encodeURIComponent(userId) }).unwrap().then(() => navigate('/profile/' + userId))
  }

  return (
    <div className={styles.container}>
      <div className={styles.subtitle}>
        <p onClick={handleRedirect}>{name}</p>
        <p>{pay} р.</p>
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

export default Order
