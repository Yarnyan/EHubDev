import styles from './modal-create.module.scss'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Experience } from '../../../../models/Experience.ts'
import { ControlledTextField } from '../../../../components/controlled-text-field/Controlled-text-field.tsx'
import { ControlledSelect } from '../../../../components/controlled-select/Controlled-select.tsx'
import { useCreatePortfolioCardMutation } from '../../api/portfolio-api.ts'

interface Inputs {
  name: string
  description: string
  stack?: string
  experience?: Experience
  pay?: string
  repoLink?: string
}

interface ModalCreateProps {
  isVacancy: boolean
}

export const ModalCreate = (
  {
    isVacancy,
  }: ModalCreateProps) => {
  const [createCard] = useCreatePortfolioCardMutation()
  const formMethods = useForm<Inputs>({ mode: 'onChange' })

  const {
    handleSubmit,
  } = formMethods

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let body: string = ''
    Object.entries(data).forEach(([key, value], index) => {
      if (index === 0) {
        body += key.charAt(0).toUpperCase() + key.slice(1) + '=' + encodeURIComponent(value)
      } else {
        body += '&' + key.charAt(0).toUpperCase() + key.slice(1) + '=' + encodeURIComponent(value)
      }
    })
    console.log(body)
    //для вакансий
    createCard({body, token: localStorage.getItem('token')})
  }

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className={styles.authSubTitle}>
            {isVacancy ? 'Создать вакансию' : 'Добавить проект'}
          </h3>
          <ControlledTextField
            sx={{
              width: '90%',
            }}
            labelType='moving'
            type='text'
            name='name'
            label='Название'
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
              width: '90%',
            }}
            labelType='moving'
            type='text'
            name='description'
            multiline={true}
            label='Описание'
            InputProps={{
              sx: {
                borderRadius: '12px',
              },
            }}
            rules={{
              required: 'Поле не заполнено',
            }}
          />
          {isVacancy ?
            <>
              <ControlledTextField
                sx={{
                  width: '90%',
                }}
                labelType='moving'
                type='text'
                name='pay'
                label='Зарплата'
                InputProps={{
                  sx: {
                    borderRadius: '12px',
                  },
                }}
                rules={{
                  required: 'Поле не заполнено',
                }}
              />
              <ControlledSelect
                sx={{
                  width: '320px',
                }}
                label='Требуемый опыт'
                name='experience'
                options={
                  [
                    { value: Experience.Intern, content: 'Нет опыта' },
                    { value: Experience.Junior, content: 'До года' },
                    { value: Experience.Middle, content: 'От 1 года до трех' },
                    { value: Experience.Senior, content: '3 и более лет' },
                  ]
                }
                rules={{
                  required: 'Поле не заполнено',
                }}
              />
            </>
            :
            <>
              <ControlledTextField
                sx={{
                  width: '90%',
                }}
                labelType='moving'
                type='text'
                name='stack'
                label='Стек технологий'
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
                  width: '90%',
                }}
                labelType='moving'
                type='text'
                name='repoLink'
                label='Ссылка на репозиторий'
                InputProps={{
                  sx: {
                    borderRadius: '12px',
                  },
                }}
                rules={{
                  required: 'Поле не заполнено',
                }}
              />
            </>
          }
          <button className={styles.btn} type='submit'>
            Принять
          </button>
        </form>
      </FormProvider>
    </div>
  )
}