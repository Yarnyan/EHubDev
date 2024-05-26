import { FieldValues, RegisterOptions } from 'react-hook-form'
import { FilledInputProps, OutlinedInputProps, SxProps, Theme } from '@mui/material'
import { HTMLInputTypeAttribute } from 'react'

export interface ControlledTextFieldProps {
  name: string
  label: string
  labelType: 'static' | 'moving'
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  sx?: SxProps<Theme>
  labelSx?: SxProps<Theme>
  type?: HTMLInputTypeAttribute
  InputProps?:  Partial<FilledInputProps> | Partial<OutlinedInputProps>
}