import styles from './portfolio.module.scss'
import { data } from './data.ts'
import { Card } from './components/card/Card.tsx'
import { useAppSelector } from '../../hooks/redux-hooks.ts'
import { User } from '../../models/User.ts'
import { Modal } from '@mui/material'
import { useState } from 'react'
import { ModalCreate } from './components/modal-create/Modal-create.tsx'

export const Portfolio = () => {
  const { userType } = useAppSelector(state => state.userReducer.user as User)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
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