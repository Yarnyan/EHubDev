import styles from './profile.module.scss'
import { UserProfileData } from './types/User-data.ts'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { EMAIL_PATTERN } from '../authorization-form/consts/consts.ts'
import { Input } from './components/input/Input.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { ControlledSelect } from '../../components/controlled-select/Controlled-select.tsx'
import { Experience } from '../../models/Experience.ts'
import { useAppSelector } from '../../hooks/redux-hooks.ts'
import { User } from '../../models/User.ts'
import { Specialization } from '../../models/Specialization.ts'
import { usePutCurrentUserDataMutation, useUploadAvatarMutation } from './api/profile-api.ts'
import { useLazyGetCurrentUserDataQuery } from '../../api/user-api.ts'
import { useSendMessageMutation } from '../chat/api/chat-api.ts'
import Modal from './components/modal/Modal.tsx'
import { useGetCurrentUserDataQuery } from '../../api/user-api.ts'

interface Inputs extends Omit<UserProfileData, 'avatar'> {
  avatar?: FileList
}

export const Profile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const userData = useAppSelector(state => state.userReducer.user as User)
  const visitedUserData = useAppSelector(state => {
    return state.userReducer.otherUsers.find(user => `${user.id}` === id)
  })
  const [putUserData] = usePutCurrentUserDataMutation()
  const [uploadAvatar] = useUploadAvatarMutation()
  const [getUserData] = useLazyGetCurrentUserDataQuery()
  const {data, isLoading, error} = useGetCurrentUserDataQuery(token)
  console.log(data)
  const [sendMessage] = useSendMessageMutation()
  const [isBlocked, setIsBlocked] = useState(false)
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<null | HTMLInputElement>(null)
  const [avatar, setAvatar] = useState<string>('image/avatar.png')
  const [enableEdit, setEnableEdit] = useState(Boolean(!id))
  const [currentFileName, setCurrentFileName] = useState<string>('')
  const formMethods = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      avatar: undefined,
      email: visitedUserData ? visitedUserData.email : userData.email || '',
      username: visitedUserData ? visitedUserData.username : userData.username || '',
      phone: visitedUserData ? visitedUserData.phone : userData.phone || '',
      description: visitedUserData ? visitedUserData.description : userData.description,
      experience: visitedUserData ? Experience[visitedUserData.experience] || 1 : Experience[userData.experience] || 1,
      specialization: visitedUserData ? Experience[visitedUserData.specialization] || 1 : Specialization[userData.specialization] || 1,
    },
  })


  useEffect(() => {
    id ? setEnableEdit(false) : setEnableEdit(true)
    const image = new Image()
    if (visitedUserData) {
      image.src = import.meta.env.VITE_API_URL + '/' + visitedUserData.avatar
    } else {
      image.src = import.meta.env.VITE_API_URL + '/' + userData.avatar
    }
    image.onload = () => setAvatar(image.src)
    image.onerror = () => setAvatar('image/avatar.png')
  }, [id, userData.avatar])

  const {
    handleSubmit,
    register,
  } = formMethods

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const body =
      'Id=' + encodeURIComponent(userData.id) +
      '&Username=' + encodeURIComponent(data.username) +
      '&Description=' + encodeURIComponent(data.description) +
      '&Phone=' + encodeURIComponent(data.phone) +
      '&Email=' + encodeURIComponent(data.email) +
      '&Login=' + encodeURIComponent(userData.login) +
      '&HashPassword=' + encodeURIComponent(userData.hashPassword) +
      '&UserType=' + encodeURIComponent(userData.userType) +
      '&Specialization=' + encodeURIComponent(data.specialization) +
      '&Experience=' + encodeURIComponent(data.experience)
    putUserData({ body, token: localStorage.getItem('token')! })

    if (data.avatar !== undefined && data.avatar[0].name !== currentFileName) {
      const formData = new FormData()
      formData.append('file', data.avatar[0])
      uploadAvatar({ body: formData, token: localStorage.getItem('token')! }).unwrap().then(() => getUserData(localStorage.getItem('token')))
      setCurrentFileName(data.avatar[0].name)
    }
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

  const navigateToVacancy = () => {
    navigate('/jobs/' + visitedUserData!.id, { state: { userType: visitedUserData!.userType } })
  }

  const navigateToPortfolio = () => {
    navigate('/portfolio/' + visitedUserData!.id, { state: { userType: visitedUserData!.userType } })
  }

  const handleSendMessage = async () => {
    openModal()
    setIsBlocked(true)
    const activeId = visitedUserData!.id;
    const message = 'Привет, заинтересовала твоя анкета';
    try {
      await sendMessage({ activeId, message, token: localStorage.getItem('token')! });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    return () => {
      console.log('Component is being unmounted');
    };
  }, []);

  return (
    <div className={styles.container}>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <input{...rest} ref={fileInputRef} type='file' hidden />
          <Input
            sendForm={() => formRef.current?.requestSubmit()}
            enableEdit={enableEdit}
            type='text'
            name='username'
            label={userData.userType === 'Default' ? 'Имя пользователя' : 'Название компании'}
            rules={{
              required: false,
            }}
          />
          <Input
            sendForm={() => formRef.current?.requestSubmit()}
            enableEdit={enableEdit}
            type='text'
            name='description'
            label={userData.userType === 'Default' ? 'О себе' : 'О компании'}
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
            label='Электронная почта'
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
          {((userData.userType === 'Default' && !visitedUserData) || (visitedUserData && visitedUserData.userType === 'Default')) &&
            <div className={styles.selectsContainer}>
              <ControlledSelect
                handleBlur={() => formRef.current?.requestSubmit()}
                disabled={!enableEdit}
                sx={{ width: '260px' }}
                label='Специализация'
                name='specialization'
                options={
                  [
                    { value: Specialization.Frontend, content: 'Frontend' },
                    { value: Specialization.Backend, content: 'Backend' },
                    { value: Specialization.Fullstack, content: 'Fullstack' },
                  ]
                } />
              <ControlledSelect
                handleBlur={() => formRef.current?.requestSubmit()}
                disabled={!enableEdit}
                sx={{ width: '260px' }}
                label='Опыт работы'
                name='experience'
                options={
                  [
                    { value: Experience.Intern, content: 'Нет опыта' },
                    { value: Experience.Junior, content: 'До года' },
                    { value: Experience.Middle, content: 'От 1 года до трех' },
                    { value: Experience.Senior, content: '3 и более лет' },
                  ]
                } />
            </div>
          }
          {!enableEdit && ((userData.userType === 'Default' && !visitedUserData) || (visitedUserData && visitedUserData.userType === 'Default')) &&
            <button style={{ marginTop: '24px' }} className={styles.profileBtn} type='button'>
              Скачать резюме
            </button>
          }
          {!enableEdit && ((userData.userType === 'Default' && !visitedUserData) || (visitedUserData && visitedUserData.userType === 'Default')) &&
            <button type='button' onClick={navigateToPortfolio} className={styles.profileBtn}>Портфолио</button>
          }
          {!enableEdit && ((userData.userType === 'Default' && !visitedUserData) || (visitedUserData && visitedUserData.userType === 'Company')) &&
            <button type='button' onClick={navigateToVacancy} className={styles.profileBtn}>Вакансии</button>
          }
          {!enableEdit && visitedUserData &&
            <button
            type='button'
            onClick={handleSendMessage}
            className={`${styles.profileBtn} ${isBlocked ? styles.disabled : ''}`}
            disabled={isBlocked}
            style={isBlocked ? { backgroundColor: '#bde4bf', border: 'none' } : { backgroundColor: '#72C075' }}
          >
            Написать
          </button>
          }
        </form>
      </FormProvider>
      {((userData.userType === 'Default' && !visitedUserData) || (visitedUserData && visitedUserData.userType === 'Default')) &&
        <div className={styles.avatarContainer}>
          <img src={avatar} alt='avatar' />
          {enableEdit &&
            <button className={styles.profileBtn} onClick={handleSelectAvatarClick}>
              Загрузить фото
            </button>
          }
        </div>
      }
      <Modal show={showModal} onClose={closeModal} title="My Modal" />
    </div>
  )
}