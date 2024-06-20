import { ControlledTextField } from '../../../../components/controlled-text-field/Controlled-text-field.tsx'
import { ControlledTextFieldProps } from '../../../../components/controlled-text-field/Controlled-text-field-props.ts'
import styles from './input.module.scss'
import { useEffect, useState } from 'react'

interface Input extends Pick<ControlledTextFieldProps, 'name' | 'rules' | 'label' | 'type' | 'multiline'> {
  enableEdit: boolean
  sendForm: () => void
}

export const Input = (
  {
    name,
    rules,
    label,
    type,
    enableEdit,
    multiline,
    sendForm
  }: Input) => {
  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    const input = document.getElementById(name)
    if (input && !disabled) {
      input.focus()
      input.addEventListener('blur', onBlurCallback)
    }
    return () => {
      if (input) {
        input.removeEventListener('blur', onBlurCallback)
      }
    }
  }, [disabled])

  const onBlurCallback = () => {
    setDisabled(true)
    sendForm()
  }

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
        disabled={disabled}
        labelType='static'
        type={type}
        name={name}
        label={label}
        rules={rules}
        id={name}
      />
    </div>
  )
}