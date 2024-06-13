import { ControlledTextField } from '../../../../components/controlled-text-field/Controlled-text-field.tsx'
import { useState } from 'react'
import { UseFormResetField } from 'react-hook-form'
import { Inputs } from '../../Builder.tsx'

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
    <div style={{ border: '1px solid black' }}>
      <ControlledTextField name={`experience.${index}.organization`} label='Название организации' labelType='moving' />
      <ControlledTextField name={`experience.${index}.experienceStart`} label='Дата начала работы' labelType='moving' />
      <ControlledTextField name={`experience.${index}.experienceEnd`} label='Дата окончания работы'
                           labelType='moving' />
      <p>
        Какие задачи вы выполняли
      </p>
      {taskNames.map(taskName => <ControlledTextField
        name={taskName}
        label='Задача'
        labelType='moving'
        key={taskName}
      />)}
      {taskNames.length <= 3 && <button type='button' onClick={handleTaskAdd}>Добавить задачу</button>}
      {taskNames.length > 1 && <button type='button' onClick={handleTaskRemove}>Убрать задачу</button>}
      <button type='button' onClick={() => removeFields(index)}>((-))</button>
    </div>
  )
}

