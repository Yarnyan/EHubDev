import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { ControlledTextFieldProps } from './Controlled-text-field-props.ts'
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#64b23c',
      transition: 'border-color 1.5s',
    },
    '& input:hover': {
      cursor: 'pointer', 
    },
  },
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderWidth: '2px',
  },
});

export const ControlledTextField = ({ name, rules, label, sx, type, InputProps }: ControlledTextFieldProps) => {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field: { value = '', onChange, onBlur }, fieldState: { error } }) => (
        <StyledTextField
          sx={{ ...sx, width: '100%', cursor: 'pointer' }}
          InputProps={InputProps}
          InputLabelProps={{
            classes: {
              root: '',
            },
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
            autoComplete: 'new-password',
          }}
        />
      )}
    />
  )
}
