import { ControlledTextField } from '../../../../components/controlled-text-field/Controlled-text-field.tsx'
import styles from './tasks-box.module.scss'

interface TasksBoxProps {
  taskNames: string[]
  handleTaskAdd: () => void
  handleTaskRemove: () => void
}

export const TasksBox = ({ taskNames, handleTaskAdd, handleTaskRemove }: TasksBoxProps) => {
  return (
    <div className={styles.container}>
      <p>
        Какие задачи вы выполняли
      </p>
      {taskNames.map(taskName => <ControlledTextField
        name={taskName}
        label='Задача'
        labelType='moving'
        key={taskName}
        sx={{width: '100%'}}
      />)}
      {taskNames.length <= 3 && <button className={styles.addBtn} type='button' onClick={handleTaskAdd}>Добавить задачу</button>}
      {taskNames.length > 1 && <button className={styles.rmBtn} type='button' onClick={handleTaskRemove}>Убрать задачу</button>}
    </div>
  )
}