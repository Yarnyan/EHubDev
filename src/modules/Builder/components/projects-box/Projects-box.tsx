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

export const ProjectsBox = ({ index, removeFields, resetField }: EducationBoxProps) => {
  const [taskNames, setTaskNames] = useState<string[]>([
    `projects.${index}.task1`,
  ])

  const handleTaskAdd = () => {
    setTaskNames([...taskNames, `projects.${index}.task${taskNames.length + 1}`])
  }

  const handleTaskRemove = () => {
    setTaskNames(taskNames.filter(taskName => taskName !== `projects.${index}.task${taskNames.length}`))
    resetField(`projects.${index}.task${taskNames.length}`)
  }

  return (
    <div className={styles.formBlock}>
      <ControlledTextField name={`projects.${index}.projectName`} label='Название проекта' labelType='moving'
                           rules={{ required: 'Поле не заполнено' }} />
      <ControlledTextField name={`projects.${index}.stack`} label='Стек технологий' labelType='moving'
                           rules={{ required: 'Поле не заполнено' }} />
      <ControlledTextField name={`projects.${index}.projectStart`} label='Дата начал работы(месяц, год)'
                           rules={{ required: 'Поле не заполнено' }}
                           labelType='moving' />
      <ControlledTextField name={`projects.${index}.projectEnd`} label='Дата окончания работы(месяц, год)'
                           rules={{ required: 'Поле не заполнено' }}
                           labelType='moving' />
      <TasksBox taskNames={taskNames} handleTaskAdd={handleTaskAdd} handleTaskRemove={handleTaskRemove} />
      <button style={{ gridArea: 'rm' }} className={styles.rmBtn} type='button'
              onClick={() => removeFields(index)}>
        <img src='/icons/minus.png' alt='#' />
      </button>
    </div>
  )
}

