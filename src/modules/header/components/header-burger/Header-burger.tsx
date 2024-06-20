import { Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import styles from './header-burger.module.scss'
import { PORTFOLIO_ROUTE, RESUMEBUILDER_ROUTE, SEARCH_ROUTE } from '../../../../consts/routes'
import { useAppSelector } from '../../../../hooks/redux-hooks.ts'
import { User } from '../../../../models/User.ts'
export const HeaderBurger = (props: {
  anchorEl: HTMLElement | null
  isMenuOpen: boolean
  handleCloseMenu: () => void
}) => {
  const user = useAppSelector(state => state.userReducer.user as User)

  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.isMenuOpen}
      onClose={props.handleCloseMenu}
    >
      <MenuItem onClick={props.handleCloseMenu}>
        <Link className={styles.link} to={PORTFOLIO_ROUTE}>{user.userType === 'Default' ? 'Портфолио' : 'Вакансии'}</Link>
      </MenuItem>
      {user.userType === 'Default' &&
        <MenuItem onClick={props.handleCloseMenu}>
          <Link className={styles.link} to={RESUMEBUILDER_ROUTE}>Конструктор резюме</Link>
        </MenuItem>
      }
      <MenuItem onClick={props.handleCloseMenu}>
        <Link className={styles.link} to={'/'}>Мессенджер</Link>
      </MenuItem>
      <MenuItem onClick={props.handleCloseMenu}>
        <Link className={styles.link} to={SEARCH_ROUTE}>{user.userType === 'Default' ? 'Вакансии' : 'Исполнители'}</Link>
      </MenuItem>
    </Menu>
  )
}