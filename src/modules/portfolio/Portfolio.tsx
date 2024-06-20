import styles from './portfolio.module.scss'
import { Card } from './components/card/Card.tsx'
import { useAppSelector } from '../../hooks/redux-hooks.ts'
import { User } from '../../models/User.ts'
import { CircularProgress, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { ModalCreate } from './components/modal-create/Modal-create.tsx'
import { useLazyGetPortfolioByIdQuery } from './api/portfolio-api.ts'
import { useParams } from 'react-router-dom'
import { useGetVacancyByIdQuery, useLazyGetVacancyByIdQuery } from '../../api/vacancy-api.ts'
import { CardData } from '../../models/Card-data.ts'
import DeleteIcon from '@mui/icons-material/Delete';
export const Portfolio = () => {
  const { userType, id } = useAppSelector(state => state.userReducer.user as User)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { userId } = useParams()
  const [getPortfolio, portfolioData] = useLazyGetPortfolioByIdQuery(userId || id)
  const [getVacancy, vacancyData] = useLazyGetVacancyByIdQuery()
  const [cardsData, setCardsData] = useState<CardData[] | undefined>(undefined)

  useEffect(() => {
    if (userType === 'Default') {
      getPortfolio(userId || id)
    }
    if (userType === 'Company') {
      getVacancy(userId || id)
    }
  }, [userType, userId, id,])

  useEffect(() => {
    if (portfolioData.data) {
      setCardsData(portfolioData.data)
    }
    if (vacancyData.data) {
      setCardsData(vacancyData.data)
    }
  }, [portfolioData.data, vacancyData.data])

  if (portfolioData.isLoading || vacancyData.isLoading) {
    return <CircularProgress size={56} color='secondary' sx={{margin: 'auto'}}/>
  }

  return (
    <>
      <div className={styles.container}>
        {cardsData && cardsData.length > 0 && cardsData.map(el => {
          return <Card
            key={el.id}
            name={el.name}
            description={el.description}
            stack={el?.stack}
            repositoryLink={el?.repoLink}
            Pay={el?.pay}
            experience={el?.experience}
          />
        })}
      </div>
      {cardsData === undefined || (cardsData && cardsData.length) === 0 && <h1 className={styles.empty} >Пока здесь пусто</h1>}
      <button className={styles.btn} onClick={() => setIsModalOpen(true)}>
        {userType === 'Default' ? 'Добавить проект' : 'Создать вакансию'}
      </button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}
          onClick={() => setIsModalOpen(false)}
        >
          <ModalCreate isVacancy={userType === 'Company'} />
        </div>
      </Modal>
    </>
  )
}