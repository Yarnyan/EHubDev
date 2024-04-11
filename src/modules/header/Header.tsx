import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import UserAvatar from '../../components/ui/UserAvatar'
export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.subtitle}>
          <h1>EdevHub</h1>
        </div>
        <div className={styles.navigate}>
          <div className={styles.navigateItem}>
            <img src="/icons/repo.png" alt="" />
            <Link to={'/'}>Репозитории</Link>
          </div>
          <div className={styles.navigateItem}>
            <img src="/icons/edit.png" alt="" />
            <Link to={'/'}>Конструктор резюме</Link>
          </div>
          <div className={styles.navigateItem}>
            <img src="/icons/message.png" alt="" />
            <Link to={'/'}>Мессенджер</Link>
          </div>
        </div>
        <div className={styles.tools}>
          <Link to={'/'} className={styles.toolLink}>
            <img src="/icons/setting.png" alt="" className={styles.toolIcon} />
          </Link>
          <UserAvatar />
        </div>
      </div>
    </header>
  )
}