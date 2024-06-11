import styles from './profile.module.scss'
import { UserData } from './types/User-data.ts'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { EMAIL_PATTERN } from '../authorization-form/consts/consts.ts'
import { Input } from './components/input/Input.tsx'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks.ts'

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

  const { id } = useParams();
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<null | HTMLInputElement>(null)
  const [enableEdit, setEnableEdit] = useState(Boolean(!id))
  const user = useAppSelector(state => state.userReducer.user)
  const formMethods = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      avatar: undefined,
      email: userData.email,
      name: userData.name,
      phone: userData.phone
    },
  })

  useEffect(() => {
    id ? setEnableEdit(false) : setEnableEdit(true)
  }, [id])

  const {
    handleSubmit,
    register,
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
            sendForm={() => formRef.current?.requestSubmit()}
            enableEdit={enableEdit}
            type='text'
            name='name'
            label='Имя пользователя'
            rules={{
              required: true,
            }}
          />
          <Input
            sendForm={() => formRef.current?.requestSubmit()}
            enableEdit={enableEdit}
            type='text'
            name='info'
            label='О себе'
            multiline={true}
            rules={{
              required: false,
            }}
          />
          <Input
            sendForm={() => formRef.current?.requestSubmit()}
            enableEdit={enableEdit}
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
            sendForm={() => formRef.current?.requestSubmit()}
            enableEdit={enableEdit}
            type='tel'
            name='phone'
            label='Телефон'
            rules={{
              required: false,
            }}
          />
          {!enableEdit &&
            <button style={{marginTop: '24px'}} className={styles.profileBtn} type='button'>
              Скачать резюме
            </button>
          }
        </form>
      </FormProvider>
      <div className={styles.avatarContainer}>
        <img src={userData.avatar || 'image/avatar.png'} alt='avatar' />
        {enableEdit &&
          <button className={styles.profileBtn} onClick={handleSelectAvatarClick}>
            Загрузить фото
          </button>
        }
      </div>
    </div>
  )
}