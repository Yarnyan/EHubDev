import { ControlledTextField } from '../../../../components/controlled-text-field/Controlled-text-field.tsx'

interface EducationBoxProps {
  index: number
  appendEductionFields: () => void
  removeEductionFields: (index: number) => void
}

export const EducationBox = ({ index, appendEductionFields, removeEductionFields }: EducationBoxProps) => {
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
      <button type='button' onClick={appendEductionFields}>((+))</button>
      <button type='button' onClick={() => removeEductionFields(index)}>((-))</button>
    </div>
  )
}
