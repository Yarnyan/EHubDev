import styles from './Footer.module.scss'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContainerDocumentation}>
          <Link to={'/'}>Ссылка на документацию</Link>
          <img src="/icons/file.png" alt="documentation icon" />
        </div>
        <div className={styles.footerContainerInformation}>
          <h2>EDH</h2>
          <p>Контактный телефон: <a href='tel:+7 999 282 88 77'>+7 999 282 88 77</a></p>
          <p>E-mail: <a href="mailto:EdevHub@dh.ru">EdevHub@dh.ru</a></p>
        </div>
      </div>
    </footer>
  )
}