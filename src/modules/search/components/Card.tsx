import React from 'react'
import styles from './Card.module.scss'
interface Card {
    title: string
    description: string
    position: string
    expertise: string
}   

const formatText = (text: string) => {
    const maxLength = 400
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    } else {
        return text
    }
}

const getExpertiseClass = (years: string) => {
    const numYears = parseInt(years.split(' ')[0]);
    if (numYears < 5) {
      return styles.expertisePurple;
    } else if (numYears < 10) {
      return styles.expertiseYellow;
    } else {
      return styles.expertiseRed;
    }
  }

const Card: React.FC<Card> = ({title, description, position, expertise}) => {
  return (
    <div className={styles.container}>
        <div className={styles.subtitle}>
            <p>{title}</p>
            <p>{position}</p>
        </div>
        <div className={styles.description}>
            <p>{formatText(description)}</p>
        </div>
        <div className={styles.expertise}>
            <div className={`${styles.indicator} ${getExpertiseClass(expertise)}`}></div>
            <p>{expertise}</p>
        </div>
    </div>
  )
}

export default Card