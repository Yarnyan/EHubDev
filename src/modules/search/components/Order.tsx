import React from 'react'
import styles from './Card.module.scss'
interface Order {
    title: string
    description: string
    price: string
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

const Order: React.FC<Order> = ({title, description, price}) => {
  return (
    <div className={styles.container}>
        <div className={styles.subtitle}>
            <p>{title}</p>
            <p>{price}</p>
        </div>
        <div className={styles.description}>
            <p>{formatText(description)}</p>
        </div>
    </div>
  )
}

export default Order