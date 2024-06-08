import styles from './profile.module.scss'
import { UserData } from './types/User-data.ts'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { useImperativeHandle, useRef, useState } from 'react'

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
    onChange: () => {formRef.current?.requestSubmit()}
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
          <input

            {...rest} ref={fileInputRef} type='file' hidden/>
        </form>
      </FormProvider>
      <div className={styles.avatarContainer}>
        <img src={userData.avatar || 'image/default-avatar.png'} alt='default avatar' />
        <button onClick={handleSelectAvatarClick}>
          Загрузить фото
        </button>
      </div>
    </div>
  )
}