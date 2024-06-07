import styles from './profile.module.scss'
import { UserData } from './types/User-data.ts'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { useRef, useState } from 'react'

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
  const fileInputRef = useRef<null | HTMLInputElement>(null)
  const [isDirtyFields, setIsDirtyFields] = useState(false)
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

  const handleSelectAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }

  }

  return (
    <div className={styles.container}>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('avatar',  {
              onChange: () => setIsDirtyFields(true)
          })} type='file' />
          {isDirtyFields && <button type='submit'>принять</button>}
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