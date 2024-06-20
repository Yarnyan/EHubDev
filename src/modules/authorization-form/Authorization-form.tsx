import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Box, CircularProgress } from '@mui/material'
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field.tsx'
import { EMAIL_PATTERN } from './consts/consts.ts'
import { validatePassword } from './helpers/validate-password.ts'
import { useRegistrationMutation, useAuthorizationMutation } from './api/authorization-api.ts'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AUTHORIZATION_ROUTE, REGISTRATION_ROUTE } from '../../consts/routes.ts'
import Checkbox from '@mui/material/Checkbox'
import styles from './authorization-form.module.scss'
import { Inputs } from './types/Inputs.ts'
import { createBody } from './helpers/create-body.ts'
import { useLazyGetCurrentUserDataQuery } from '../../api/user-api.ts'

export const AuthorizationForm = () => {
  const { pathname } = useLocation()
  const isRegistration = pathname === REGISTRATION_ROUTE
  const [isSendingForm, setIsSendingForm] = useState(false)
  const [registration, registrationRequestData] = useRegistrationMutation()
  const [authorization, authorizationRequestData] = useAuthorizationMutation()
  console.log(authorizationRequestData)
  const [getCurrentUser] = useLazyGetCurrentUserDataQuery()
  const navigate = useNavigate()

  const formMethods = useForm<Inputs>({ mode: 'onBlur' })

  const {
    handleSubmit,
    getValues,
    reset,
    register,
    formState: { isValid, isSubmitSuccessful },
  } = formMethods

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isRegistration) {
      const { email, password, login, userType } = data
      const body = createBody(email, login, password, userType)
      await registration(body).unwrap().then(() => getCurrentUser(localStorage.getItem('token')))
    } else {
      const { password, emailOrLogin } = data
      const body = createBody(emailOrLogin!, emailOrLogin!, password)
      await authorization(body).unwrap().then(() => getCurrentUser(localStorage.getItem('token')))
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
      navigate('/profile')
    }
    reset()
  }, [pathname, isSubmitSuccessful])

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  return (
    <FormProvider {...formMethods}>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          margin: '3px auto',
          minWidth: '280px',
          minHeight: '356px',
          maxWidth: '640px',
          maxHeight: '640px',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h5 className={styles.authSubTitle}>
          {isRegistration ? 'Регистрация' : 'Авторизация'}
        </h5>
        {isRegistration ?
          <>
            <ControlledTextField
              sx={{
                width: '100%',
              }}
              labelType='moving'
              type='login'
              name='login'
              label='Login'
              InputProps={{
                sx: {
                  borderRadius: '12px',
                },
              }}
              rules={{
                required: 'Поле не заполнено',
              }}
            />
            <ControlledTextField
              sx={{
                width: '100%',
                mt: 3,
              }}
              labelType='moving'
              type='email'
              name='email'
              label='Email'
              InputProps={{
                sx: {
                  borderRadius: '12px',
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
          </>
          :
          <ControlledTextField
            sx={{
              width: '100%',
              mt: 3,
            }}
            labelType='moving'
            type='text'
            name='emailOrLogin'
            label='Email или Логин'
            InputProps={{
              sx: {
                borderRadius: '12px',
              },
            }}
            rules={{
              required: 'Поле не заполнено',
            }}
          />
        }
        <ControlledTextField
          sx={{
            width: '100%',
            mt: 3,
          }}
          InputProps={{ sx: { borderRadius: '12px' } }}
          labelType='moving'
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
                width: '100%',
                mt: 3,
              }}
              InputProps={{ sx: { borderRadius: '12px' } }}
              labelType='moving'
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

        {isRegistration && (
          <div className={styles.checkbox}>
            <Checkbox {...register('userType')} {...label} defaultChecked />
            <p>Я работодатель</p>
          </div>
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
        {authorizationRequestData.isError && (
          <p className={styles.error}>Неверен логин или пароль</p>
        )}
        {registrationRequestData.isError && (
          <p className={styles.error}>Почта или логин уже заняты</p>
        )}
        {isRegistration ?
          <p className={styles.authTitle}>Уже есть аккаунт? <NavLink to={AUTHORIZATION_ROUTE}
            className={styles.authLink}>Войти</NavLink></p> :
          <p className={styles.authTitle}>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}
            className={styles.authLink}>Зарегистрироваться</NavLink>
          </p>
        }
      </Box>
    </FormProvider>
  )
}
