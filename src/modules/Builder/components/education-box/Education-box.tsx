import { ControlledTextField } from '../../../../components/controlled-text-field/Controlled-text-field.tsx'
import styles from '../../Builder.module.scss'

interface EducationBoxProps {
  index: number
  removeFields: (index: number) => void
}

export const EducationBox = ({ index, removeFields }: EducationBoxProps) => {
  return (
    <div className={styles.formBlock}>
      <ControlledTextField name={`education.${index}.university`} label='Учебное заведение' labelType='moving'  rules={{required: 'Поле не заполнено'}}/>
      <ControlledTextField name={`education.${index}.universityLocation`} label='Где находится' labelType='moving'  rules={{required: 'Поле не заполнено'}}/>
      <ControlledTextField name={`education.${index}.universityStart`} label='Дата начала обучения(месяц, год)'
                           labelType='moving'  rules={{required: 'Поле не заполнено'}}/>
      <ControlledTextField name={`education.${index}.universityEnd`} label='Дата окончания обучения(месяц, год)'
                           labelType='moving'  rules={{required: 'Поле не заполнено'}}/>
      <ControlledTextField name={`education.${index}.specialization`} label='Направление подготовки'
                           labelType='moving'  rules={{required: 'Поле не заполнено'}}/>
      <button className={styles.rmBtn} type='button' onClick={() => removeFields(index)}>
        <img src='/icons/minus.png' alt='#' />
      </button>
    </div>
  )
}
