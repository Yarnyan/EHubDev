import { ControlledTextField } from '../../../../components/controlled-text-field/Controlled-text-field.tsx'
import { useState } from 'react'
import { UseFormResetField } from 'react-hook-form'
import { Inputs } from '../../Builder.tsx'
import styles from '../../Builder.module.scss'
import { TasksBox } from '../tasks-box/Tasks-box.tsx'

interface EducationBoxProps {
  index: number
  removeFields: (index: number) => void
  resetField: UseFormResetField<Inputs>
}

export const ExperienceBox = ({ index, removeFields, resetField }: EducationBoxProps) => {
  const [taskNames, setTaskNames] = useState<string[]>([
    `experience.${index}.task1`,
  ])

  const handleTaskAdd = () => {
    setTaskNames([...taskNames, `experience.${index}.task${taskNames.length + 1}`])
  }

  const handleTaskRemove = () => {
    setTaskNames(taskNames.filter(taskName => taskName !== `experience.${index}.task${taskNames.length}`))
    resetField(`experience.${index}.task${taskNames.length}`)
  }

  return (
    <div className={styles.formBlock}>
      <ControlledTextField name={`experience.${index}.position`} label='Кем работали' labelType='moving' />
      <ControlledTextField name={`experience.${index}.organization`} label='Название организации' labelType='moving' />
      <ControlledTextField name={`experience.${index}.experienceStart`} label='Дата начала работы' labelType='moving' />
      <ControlledTextField name={`experience.${index}.experienceEnd`} label='Дата окончания работы'
                           labelType='moving' />
      <TasksBox taskNames={taskNames} handleTaskAdd={handleTaskAdd} handleTaskRemove={handleTaskRemove} />
      <button style={{ gridArea: 'rm' }} className={styles.rmBtn} type='button'
              onClick={() => removeFields(index)}>
        <img src='/icons/minus.png' alt='#' />
      </button>
    </div>
  )
}

