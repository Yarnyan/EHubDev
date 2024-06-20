import styles from './Search.module.scss'
import Card from './components/Card.tsx'
import Order from './components/Order.tsx'
import { useAppSelector } from '../../hooks/redux-hooks.ts'
import { User } from '../../models/User.ts'
import { useLazyGetAllUsersQuery } from '../../api/user-api.ts'
import { useLazyGetAllVacancyQuery } from '../../api/vacancy-api.ts'
import { useEffect, useState } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Experience } from '../../models/Experience.ts'
import InputLabel from '@mui/material/InputLabel'
import { Specialization } from '../../models/Specialization.ts'


export const Search = () => {
  const [getUsers] = useLazyGetAllUsersQuery()
  const [getVacancyList] = useLazyGetAllVacancyQuery()
  const { userType } = useAppSelector(state => state.userReducer.user as User)
  const users = useAppSelector(state => state.userReducer.otherUsers)
  const vacancyList = useAppSelector(state => state.userReducer.vacancyList)
  const [filters, setFilters] = useState<{ spec: Specialization | 11, exp: Experience | 11 }>({ spec: 11, exp: 11 })

  useEffect(() => {
    if (userType === 'Company') {
      const params = 'UserType=' + encodeURIComponent(0) +
        (filters.exp === 11 ? '' : '&Exp=' + encodeURIComponent(filters.exp)) +
        (filters.spec === 11 ? '' : '&Spec=' + encodeURIComponent(filters.spec))
      getUsers({
        token: localStorage.getItem('token')!, params,
      })
    }
    if (userType === 'Default') {
      const params = 'UserType=' + encodeURIComponent(1) +
        (filters.exp === 11 ? '' : '&Exp=' + encodeURIComponent(filters.exp))
      getVacancyList({ token: localStorage.getItem('token')!, params })
    }
  }, [filters.spec, filters.exp])

  const experienceOptions = [
    { value: 11, content: 'Не выбрано' },
    { value: Experience.Intern, content: 'Нет опыта' },
    { value: Experience.Junior, content: 'До года' },
    { value: Experience.Middle, content: 'От 1 года до трех' },
    { value: Experience.Senior, content: '3 и более лет' },
  ]

  const specializationOptions = [
    { value: 11, content: 'Не выбрано' },
    { value: Specialization.Frontend, content: 'Frontend' },
    { value: Specialization.Backend, content: 'Backend' },
    { value: Specialization.Fullstack, content: 'Fullstack' },
  ]

  return (
    <div>
      <div className={styles.filters}>
        <div>
          <InputLabel style={{ margin: '0 5px' }}
                      id='experience'>
            {userType === 'Default' ? 'Требуемый опыт' : 'Опыт работы'}</InputLabel>
          <Select
            value={filters.exp}
            onChange={(e) => setFilters({ ...filters, exp: e.target.value })}
            labelId='experience' sx={{ outline: '2px solid #72C075', width: '200px' }}>
            {experienceOptions.map(option => {
              return <MenuItem key={option.content} value={option.value}>{option.content}</MenuItem>
            })}
          </Select>
        </div>
        {userType === 'Company' &&
          <div>
            <InputLabel style={{ margin: '0 5px' }}
                        id='spec'>Специализация</InputLabel>
            <Select
              value={filters.spec}
              onChange={(e) => setFilters({ ...filters, spec: e.target.value })}
              labelId='spec' sx={{ outline: '2px solid #72C075', width: '200px' }}
            >
              {specializationOptions.map(option => {
                return <MenuItem key={option.content} value={option.value}>{option.content}</MenuItem>
              })}
            </Select>
          </div>
        }
      </div>
      {userType === 'Company' &&
        users.map(user => {
          return <Card name={user.username} description={user.description} experience={user.experience} userId={user.id}
                       key={user.id} specialization={user.specialization} />
        })
      }
      {userType === 'Default' &&
        vacancyList.map(vacancy => {
          return <Order id={vacancy.id} name={vacancy.name} description={vacancy.description} pay={vacancy.pay}
                        experience={vacancy.experience} userId={vacancy.userId} key={vacancy.id} />
        })

      }
    </div>
  )
}
