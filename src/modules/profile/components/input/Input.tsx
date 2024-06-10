import { ControlledTextField } from '../../../../components/controlled-text-field/Controlled-text-field.tsx'
import { ControlledTextFieldProps } from '../../../../components/controlled-text-field/Controlled-text-field-props.ts'
import styles from './input.module.scss'
import { useState } from 'react'

interface Input extends Pick<ControlledTextFieldProps, 'name' | 'rules' | 'label' | 'type' | 'multiline'> {
  enableEdit: boolean
}

export const Input = (
  {
    name,
    rules,
    label,
    type,
    enableEdit,
    multiline
  }: Input) => {
  const [disabled, setDisabled] = useState(true)

  const handleEditClick = () => {
    setDisabled(false)
  }

  return (
    <div className={styles.inputContainer}>
      {enableEdit &&
        <button className={styles.editBtn} onClick={handleEditClick}>
          <img src='icons/Edit.svg' alt='edit icon' />
        </button>
      }
      <ControlledTextField
        sx={{
          width: '100%',
        }}
        multiline={multiline}
        focused={!disabled}
        disabled={disabled}
        labelType='static'
        type={type}
        name={name}
        label={label}
        rules={rules}
      />
    </div>
  )
}