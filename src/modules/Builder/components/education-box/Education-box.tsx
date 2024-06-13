import { ControlledTextField } from '../../../../components/controlled-text-field/Controlled-text-field.tsx'

interface EducationBoxProps {
  index: number
  removeFields: (index: number) => void
}

export const EducationBox = ({ index, removeFields }: EducationBoxProps) => {
  return (
    <div style={{ border: '1px solid black' }}>
      <ControlledTextField name={`education.${index}.university`} label='Учебное заведение' labelType='moving' />
      <ControlledTextField name={`education.${index}.universityLocation`} label='Где находится' labelType='moving' />
      <ControlledTextField name={`education.${index}.universityStart`} label='Дата начала обучения'
                           labelType='moving' />
      <ControlledTextField name={`education.${index}.universityEnd`} label='Дата окончания обучения'
                           labelType='moving' />
      <ControlledTextField name={`education.${index}.specialization`} label='Направление подготовки'
                           labelType='moving' />
      <button type='button' onClick={() => removeFields(index)}>((-))</button>
    </div>
  )
}
