import { Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import styles from './header-burger.module.scss'
import { RESUMEBUILDER_ROUTE } from '../../../../consts/routes'
export const HeaderBurger = (props: {
  anchorEl: HTMLElement | null
  isMenuOpen: boolean
  handleCloseMenu: () => void
}) => {
  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.isMenuOpen}
      onClose={props.handleCloseMenu}
    >
      <MenuItem onClick={props.handleCloseMenu}>
        <Link className={styles.link} to={'/'}>Репозитории</Link>
      </MenuItem>
      <MenuItem onClick={props.handleCloseMenu}>
        <Link className={styles.link} to={RESUMEBUILDER_ROUTE}>Конструктор резюме</Link>
      </MenuItem>
      <MenuItem onClick={props.handleCloseMenu}>
        <Link className={styles.link} to={'/'}>Мессенджер</Link>
      </MenuItem>
    </Menu>
  )
}