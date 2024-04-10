import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field.tsx'
import { EMAIL_PATTERN } from './consts/consts.ts'
import { validatePassword } from './helpers/validate-password.ts'
import { useRegistrationMutation, useAuthorizationMutation } from './api/authorization-api.ts'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AUTHORIZATION_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../../consts/routes.ts'
import InputUi from '../../components/ui/InputUi.tsx'
// import { handleFieldError } from './helpers/handle-field-error.ts'
import styles from './authorization-form.module.scss'
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
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h5 className={styles.authSubTitle}>
          {isRegistration ? 'Регистрация' : 'Авторизация'}
        </h5>
        <ControlledTextField
          type='email'
          name='email'
          label='Email'
          InputProps={{
            sx: {
              borderRadius: '12px',
              borderColor: '#64b23c',
            },
          }}
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

        <button
          type='submit'
          className={styles.buttonAuth}
          disabled={!isValid || isSendingForm}
        >
          {isSendingForm ? (
            <CircularProgress size={20} />
          ) : isRegistration ? (
            'Зарегистрироваться'
          ) : (
            'Авторизироваться'
          )}
        </button>
        {isRegistration ?
          <p className={styles.authTitle}>Уже есть аккаунт? <NavLink to={AUTHORIZATION_ROUTE} className={styles.authLink}>Войти</NavLink></p> :
          <p className={styles.authTitle}>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} className={styles.authLink}>Зарегистрироваться</NavLink></p>
        }
      </Box>
    </FormProvider>
  )
}
