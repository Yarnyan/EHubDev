import styles from './portfolio.module.scss'
import { data } from './data.ts'
import { Card } from './components/Card.tsx'
import { useAppSelector } from '../../hooks/redux-hooks.ts'
import { User } from '../../models/User.ts'

export const Portfolio = () => {
  const {type} = useAppSelector(state => state.userReducer.user as User)

  return (
    <div className={styles.container}>
      {data.map(el => {
        return <Card
          key={el.id}
          name={el.name}
          description={el.description}
          stack={el?.stack}
          repositoryLink={el?.repositoryLink}
          salary={el?.salary}
          experience={el?.experience}
        />
      })}
    </div>
  )
}