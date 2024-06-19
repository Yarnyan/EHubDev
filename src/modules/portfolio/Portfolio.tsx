import styles from './portfolio.module.scss'
import { Card } from './components/card/Card.tsx'
import { useAppSelector } from '../../hooks/redux-hooks.ts'
import { User } from '../../models/User.ts'
import { Modal } from '@mui/material'
import { useState } from 'react'
import { ModalCreate } from './components/modal-create/Modal-create.tsx'
import { useGetPortfolioByIdQuery } from './api/portfolio-api.ts'
import { useParams } from 'react-router-dom'

export const Portfolio = () => {
  const { userType, id } = useAppSelector(state => state.userReducer.user as User)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { userId } = useParams()
  const {data, error, isLoading} = useGetPortfolioByIdQuery(userId || id)
  
  return (
    <>
      <div className={styles.container}>
        {data && data.map(el => {
          return <Card
            key={el.id}
            name={el.name}
            description={el.description}
            stack={el?.stack}
            repositoryLink={el?.repoLink}
            salary={el?.pay}
            experience={el?.experience}
          />
        })}
      </div>
      <button className={styles.btn} onClick={() => setIsModalOpen(true)}>
        {userType === 'Default' ? 'Добавить проект' : 'Создать вакансию'}
      </button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div
          style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}
          onClick={() => setIsModalOpen(false)}
        >
          <ModalCreate isVacancy={userType === 'Company'}/>
        </div>
      </Modal>
    </>
  )
}