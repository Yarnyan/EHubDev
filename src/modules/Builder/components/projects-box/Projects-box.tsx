import { ControlledTextField } from '../../../../components/controlled-text-field/Controlled-text-field.tsx'
import { useState } from 'react'
import { UseFormResetField } from 'react-hook-form'
import { Inputs } from '../../Builder.tsx'

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
    <div style={{ border: '1px solid black' }}>
      <ControlledTextField name={`projects.${index}.projectName`} label='Название проекта' labelType='moving' />
      <ControlledTextField name={`projects.${index}.stack`} label='Стек технологий' labelType='moving' />
      <ControlledTextField name={`projects.${index}.projectStart`} label='Дата начал работы'
                           labelType='moving' />
      <ControlledTextField name={`projects.${index}.projectEnd`} label='Дата окончания работы'
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

