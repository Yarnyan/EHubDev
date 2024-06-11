import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { ControlledTextFieldProps } from './Controlled-text-field-props.ts'
import { styled } from '@mui/material/styles'

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
})

export const ControlledTextField = (
  {
    name,
    rules,
    label,
    sx,
    type,
    InputProps,
    labelType,
    labelSx,
    placeholder,
    disabled,
    multiline,
    id,
    changeHandler,
  }: ControlledTextFieldProps) => {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field: { value = '', onChange, onBlur }, fieldState: { error } }) => (
        <>
          <StyledTextField
            id={id}
            onInput={changeHandler}
            multiline={multiline || false}
            disabled={disabled || false}
            sx={{ ...sx, cursor: 'pointer' }}
            InputProps={InputProps}
            color='secondary'
            placeholder={placeholder}
            type={type || 'text'}
            helperText={error ? error.message : null}
            error={!!error}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            InputLabelProps={labelType === 'static' ? {
              shrink: false, sx: {
                top: '-46px',
                left: '-14px',
                fontWeight: '500',
                fontSize: '16px',
                color: '#888888',
                ...labelSx,
              },
            } : {}}
            label={label}
            variant='outlined'
            inputProps={{
              maxLength: multiline ? 600 : 50,
              autoComplete: 'new-password',
            }}
          />
        </>
      )}
    />
  )
}
