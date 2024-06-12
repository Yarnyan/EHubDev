import styles from './modal-create.module.scss'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Experience } from '../../../../models/Experience.ts'
import { ControlledTextField } from '../../../../components/controlled-text-field/Controlled-text-field.tsx'
import { ControlledSelect } from '../../../../components/controlled-select/Controlled-select.tsx'

interface Inputs {
  name: string
  description: string
  stack?: string
  experience?: Experience
  salary?: string
  repositoryLink?: string
}

interface ModalCreateProps {
  isVacancy: boolean
}

export const ModalCreate = (
  {
    isVacancy,
  }: ModalCreateProps) => {
  const formMethods = useForm<Inputs>({ mode: 'onChange' })

  const {
    handleSubmit,
  } = formMethods

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
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
                name='salary'
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
                    { value: Experience.intern, content: Experience.intern },
                    { value: Experience.junior, content: Experience.junior },
                    { value: Experience.middle, content: Experience.middle },
                    { value: Experience.senior, content: Experience.senior },
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
                name='repositoryLink'
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