import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { ControlledTextFieldProps } from './Controlled-text-field-props.ts'

export const ControlledTextField = ({ name, rules, label, sx, type, InputProps }: ControlledTextFieldProps) => {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field: { value = '', onChange, onBlur }, fieldState: { error } }) => (
        <TextField
          sx={{...sx, width: '80%', }}
          InputProps={InputProps}
          InputLabelProps={{classes: {
          root: ''
          }
          }}
          color='secondary'
          type={type || 'text'}
          helperText={error ? error.message : null}
          error={!!error}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          label={label}
          variant="outlined"
          inputProps={{
            maxLength: 50,
            autoComplete: 'new-password'
          }}
        />
      )}
    />
  )
}
