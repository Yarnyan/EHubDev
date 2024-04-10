import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field.tsx'
import { EMAIL_PATTERN } from './consts/consts.ts'
import { validatePassword } from './helpers/validate-password.ts'
import { useRegistrationMutation, useAuthorizationMutation } from './api/authorization-api.ts'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AUTHORIZATION_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../../consts/routes.ts'
// import { handleFieldError } from './helpers/handle-field-error.ts'
import { Inputs } from './types/Inputs.ts'

export const AuthorizationForm = () => {
  const { pathname } = useLocation()
  const isRegistration = pathname === REGISTRATION_ROUTE
  const [isSendingForm, setIsSendingForm] = useState(false)
  const [registration, registrationRequestData] = useRegistrationMutation()
  const [authorization, authorizationRequestData] = useAuthorizationMutation()
  const navigate = useNavigate()

  const formMethods = useForm<Inputs>({ mode: 'onBlur' })

  const {
    handleSubmit,
    getValues,
    reset,
    // setError,
    formState: { isValid, isSubmitSuccessful },
  } = formMethods

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isRegistration) {
      const { email, password } = data
      await registration({ email, password }).unwrap()
      //   .catch((error) => {
      //   handleFieldError(error, setError)
      // })
    } else {
      const { email, password } = data
      await authorization({ email, password }).unwrap()
      //   .catch((error) => {
      //   handleFieldError(error, setError)
      // })
    }
  }

  useEffect(() => {
    if (authorizationRequestData.isLoading || registrationRequestData.isLoading) {
      setIsSendingForm(true)
    } else {
      setIsSendingForm(false)
    }
  }, [
    authorizationRequestData.isLoading,
    registrationRequestData.isLoading,
  ])

  useEffect(() => {
    if (isSubmitSuccessful) {
      navigate(MAIN_ROUTE)
    }
    reset()
  }, [pathname, isSubmitSuccessful])

  return (
    <FormProvider {...formMethods}>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          margin: '3px auto',
          minWidth: '356px',
          minHeight: '356px',
          maxWidth: '640px',
          maxHeight: '640px',
          border: 1,
          borderColor: '#64b23c',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          component='h5'
          variant='h5'
          align='center'
          sx={{
            margin: 3,
          }}
        >
          {isRegistration ? 'Регистрация' : 'Авторизация'}
        </Typography>
        <ControlledTextField
          type='email'
          name='email'
          label='Email'
          InputProps={{ sx: { borderRadius: '12px', borderColor: '#64b23c' } }}
          rules={{
            required: 'Поле не заполнено',
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Неверно указан email',
            },
          }}
        />
        <ControlledTextField
          sx={{
            mt: 3,
          }}
          InputProps={{ sx: { borderRadius: '12px' } }}
          type='password'
          name='password'
          label='Пароль'
          rules={{
            required: 'Поле не заполнено',
            validate: (value) => validatePassword(value),
          }}
        />
        {isRegistration && (
          <>
            <ControlledTextField
              sx={{
                mt: 3,
              }}
              InputProps={{ sx: { borderRadius: '12px' } }}
              type='password'
              name='confirmPassword'
              label='Подтвердите пароль'
              rules={{
                required: 'Поле не заполнено',
                validate: (value) => {
                  return value === getValues('password') || 'Пароли не совпадают'
                },
              }}
            />
          </>
        )}

        <Button
          type='submit'
          color='secondary'
          variant='contained'
          disabled={!isValid || isSendingForm}
          sx={{
            margin: '18px auto',
            borderRadius: '12px',
          }}
        >
          {isSendingForm ? (
            <CircularProgress size={20} />
          ) : isRegistration ? (
            'Зарегистрироваться'
          ) : (
            'Авторизироваться'
          )}
        </Button>
        {isRegistration ?
          <NavLink to={AUTHORIZATION_ROUTE}>Войти</NavLink> :
          <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>
        }
      </Box>
    </FormProvider>
  )
}
