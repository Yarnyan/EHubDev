import React from 'react'
import styles from './InputUi.module.scss'

export default function InputUi() {
  return (
    <div className={styles.input__container}>
        <label htmlFor="">{'Электронная почта'}:</label>
        <input type="text" />
    </div>
  )
}