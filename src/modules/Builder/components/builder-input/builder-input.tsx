import { ControlledTextField } from '../../../../components/controlled-text-field/Controlled-text-field.tsx'

interface BuilderInputProps {
  name: string
}

export const BuilderInput = ({name}: BuilderInputProps) => {
  return (
    <ControlledTextField name={name} label={name} labelType={'moving'}/>
  )
}