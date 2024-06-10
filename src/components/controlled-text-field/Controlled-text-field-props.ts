import { FieldValues, RegisterOptions } from 'react-hook-form'
import { FilledInputProps, OutlinedInputProps, SxProps, Theme } from '@mui/material'
import React, { HTMLInputTypeAttribute } from 'react'

export interface ControlledTextFieldProps {
  name: string
  label: string
  labelType: 'static' | 'moving'
  placeholder?: string
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  sx?: SxProps<Theme>
  labelSx?: SxProps<Theme>
  type?: HTMLInputTypeAttribute
  InputProps?:  Partial<FilledInputProps> | Partial<OutlinedInputProps>
  disabled?: boolean
  focused?: boolean
  multiline?: boolean
  id?: string
  changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
