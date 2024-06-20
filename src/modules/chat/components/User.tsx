import React from 'react'
import styles from './User.module.scss'
import UserAvatar from '../../../components/user-avatar/User-avatar'

interface  User {
  title: string,
  message: string,
  time: string,
  avatar: string,
}   

const User: React.FC<User> = ({title, message, time, avatar}) => {
  const formatText = (text: string | undefined) => {
    const maxLength = 20;
    if (!text) {
      return ""; 
    } else if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <UserAvatar avatar={avatar}/> 
      </div>
      <div className={styles.containerInfo}>
        <div className={styles.header}>
          <p>{title}</p> 
          <p>{time}</p>
        </div>
        <div className={styles.message}>
          {/* <p>{formatText(message)}</p> */}
        </div>
      </div>
    </div>
  )
}

export default User
