import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form'
import InputLabel from '@mui/material/InputLabel'
import { SxProps, Theme } from '@mui/material'
import { styled } from '@mui/material/styles'

interface ControlledSelectProps {
  name: string
  options: { value: string, content: string }[]
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  sx?: SxProps<Theme>
  label: string
}

const StyledSelect = styled(Select)({
  '& .MuiOutlinedSelect-root': {
    '&:hover .MuiSelect-iconOutlined': {
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

export const ControlledSelect = (
  {
    name, rules = { required: 'Поле не заполнено' }, options, label, sx
  }: ControlledSelectProps) => {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field: { value = [options[0].value], onBlur, onChange } }) => (
        <div>
          <InputLabel id={label}>{label}</InputLabel>
          <StyledSelect
            sx={{...sx}}
            labelId={label}
            value={value}
            label={name}
            onBlur={onBlur}
            onChange={onChange}
          >
            {options.map(option => {
              return <MenuItem key={option.content} value={option.value}>{option.content}</MenuItem>
            })}
          </StyledSelect>
        </div>
      )}
    />
  )
}