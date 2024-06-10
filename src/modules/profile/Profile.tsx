import styles from './profile.module.scss'
import { UserData } from './types/User-data.ts'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { useImperativeHandle, useRef, useState } from 'react'
import { EMAIL_PATTERN } from '../authorization-form/consts/consts.ts'
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field.tsx'
import { Input } from './components/input/Input.tsx'

interface Inputs extends Omit<UserData, 'avatar'> {
  avatar?: File
}

export const Profile = () => {
  //получаем из запроса информацию по id пользователя
  const userData: UserData = {
    email: 'hello11@mail.com',
    name: 'ПОльЗоваТель Номер-один',
    phone: '+78334516946',
  }
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<null | HTMLInputElement>(null)
  const formMethods = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      avatar: undefined,
    },
  })

  const {
    handleSubmit,
    register,
    formState: { isValid, dirtyFields },
  } = formMethods

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
  }

  const { ref, ...rest } = register('avatar', {
    onChange: () => {
      formRef.current?.requestSubmit()
    },
  })

  useImperativeHandle(ref, () => fileInputRef.current)

  const handleSelectAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className={styles.container}>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <input{...rest} ref={fileInputRef} type='file' hidden />
          <Input
            enableEdit={true}
            type='text'
            name='name'
            label='Имя пользователя'
            rules={{
              required: true,
            }}
          />
          <Input
            enableEdit={true}
            type='text'
            name='info'
            label='О себе'
            multiline={true}
            rules={{
              required: false,
            }}
          />
          <Input
            enableEdit={true}
            type='email'
            name='email'
            label='Электронная почта:'
            rules={{
              required: true,
              pattern: {
                value: EMAIL_PATTERN,
                message: 'Неверно указан email',
              },
            }}
          />
          <Input
            enableEdit={true}
            type='tel'
            name='phone'
            label='Телефон'
            rules={{
              required: false,
            }}
          />
        </form>
      </FormProvider>
      <div className={styles.avatarContainer}>
        <img src={userData.avatar || 'icons/avatar.svg'} alt='default avatar' />
        <button onClick={handleSelectAvatarClick}>
          Загрузить фото
        </button>
      </div>
    </div>
  )
}