import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import UserAvatar from '../../components/user-avatar/User-avatar.tsx'
import { useRef, useState } from 'react'
import { HeaderBurger } from './components/header-burger/Header-burger.tsx'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { PORTFOLIO_ROUTE, RESUMEBUILDER_ROUTE, SEARCH_ROUTE, CHAT_ROUTE } from '../../consts/routes.ts'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks.ts'

export const Header = () => {
  const headerRef = useRef(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)
  const navigate = useNavigate()
  const user = useAppSelector(state => state.userReducer.user)

  const handleMenuButtonClick = () => {
    setAnchorEl(headerRef.current)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.container}>
        {user !== null && user !== 'unknown' &&
          <>
            <IconButton
              size='large'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={handleMenuButtonClick}
              className={styles.burger}
            >
              <MenuIcon />
            </IconButton>
            <HeaderBurger anchorEl={anchorEl} isMenuOpen={isMenuOpen} handleCloseMenu={handleCloseMenu} />
          </>
        }
        <div className={styles.subtitle}>
          <h1>EdevHub</h1>
        </div>
        {user !== null && user !== 'unknown' &&
          <div className={styles.navigate}>
            <button onClick={() => navigate(user.userType === 'Default' ? '/portfolio' : '/jobs')} className={styles.navigateItem}>
              <img src='/icons/repo.png' alt='' />
              <p>{user.userType === 'Default' ? 'Портфолио' : 'Вакансии'}</p>
            </button>
            {user.userType === 'Default' &&
              <button onClick={() => navigate(RESUMEBUILDER_ROUTE)} className={styles.navigateItem}>
                <img src='/icons/edit.png' alt='' />
                <p>Конструктор резюме</p>
              </button>
            }
            <button onClick={() => navigate(CHAT_ROUTE)} className={styles.navigateItem}>
              <img src='/icons/message.png' alt='' />
              <p>Мессенджер</p>
            </button>
            <button onClick={() => navigate(SEARCH_ROUTE)} className={styles.navigateItem}>
              <img src='/icons/Rowing.svg' alt='' />
              <p>{user.userType === 'Default' ? 'Вакансии' : 'Исполнители'}</p>
            </button>
          </div>
        }
        <div className={styles.tools}>
          <Link to={'/'} className={styles.toolLink}>
            <img src='/icons/setting.png' alt='' className={styles.toolIcon} />
          </Link>
          <UserAvatar />
        </div>
      </div>
    </header>
  )
}