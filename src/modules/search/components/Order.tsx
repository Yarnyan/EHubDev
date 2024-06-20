import React from 'react'
import { useDispatch } from 'react-redux'
import { setActiveId } from '../../../store/reducers/chat-slise'
import styles from './Card.module.scss'
import { useNavigate } from 'react-router-dom'
interface Order {
  title: string
  description: string
  expertise: string
  pay: number
  userId: number
}

const Order: React.FC<Order> = ({ title, description, expertise, pay, userId }) => {
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
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const handleButtonClick = () => {
    dispatch(setActiveId(userId)); 
    navigate('/chat')
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.subtitle}>
        <p>{title}</p>
        <p>{pay}$</p>
      </div>
      <div className={styles.description}>
        <p>{formatText(description)}</p>
      </div>
      <div className={styles.expertise}>
        <div className={styles.ff}>
          <div className={`${styles.indicator} ${getExpertiseClass(expertise)}`}></div>
          <p>{expertise}</p>
        </div>
        <div>
          <button onClick={handleButtonClick}>написать</button>
        </div>
      </div>
    </div>
  )
}

export default Order
