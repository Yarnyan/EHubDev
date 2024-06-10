import React from 'react'
import styles from './Card.module.scss'
interface Card {
    title: string
    description: string
    position: string
}   

const formatText = (text: string) => {
    const maxLength = 400
    console.log(text.length)
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    } else {
        return text
    }
}

const Card: React.FC<Card> = ({title, description, position}) => {
  return (
    <div className={styles.container}>
        <div className={styles.subtitle}>
            <p>{title}</p>
            <p>{position}</p>
        </div>
        <div className={styles.description}>
            <p>{formatText(description)}</p>
        </div>
    </div>
  )
}

export default Card