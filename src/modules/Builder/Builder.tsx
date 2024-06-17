import { useForm, FormProvider, SubmitHandler, useFieldArray } from 'react-hook-form'
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field.tsx'
import styles from './Builder.module.scss'
import { EducationBox } from './components/education-box/Education-box.tsx'
import { ExperienceBox } from './components/experience-box/Experience-box.tsx'
import { ProjectsBox } from './components/projects-box/Projects-box.tsx'
import { ResumeTemplate } from './templates/Resume-template.tsx'
import { useRef } from 'react'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'

export interface Inputs {
  name: string
  phone: string
  email: string
  github: string
  education: {
    university: string
    universityLocation: string
    universityStart: string
    universityEnd: string
    specialization: string
  }[]
  experience: {
    position: string
    organization: string
    experienceStart: string
    experienceEnd: string
    task1: string
    task2?: string
    task3?: string
    task4?: string
  }[]
  projects: {
    projectName: string
    stack: string
    projectStart: string
    projectEnd: string
    task1: string
    task2?: string
    task3?: string
    task4?: string
  }[]
  languages: string
  frameworks: string
  libraries: string
}

export const Builder = () => {
  const downloadTemplateRef = useRef<HTMLElement>(null)

  const formMethods = useForm<Inputs>({
    mode: 'onBlur',
    defaultValues: {
      education: [{
        university: '',
        universityLocation: '',
        universityStart: '',
        universityEnd: '',
        specialization: '',
      }],
      experience: [{
        position: '',
        organization: '',
        experienceStart: '',
        experienceEnd: '',
        task1: '',
      }],
      projects: [{
        projectName: '',
        stack: '',
        projectStart: '',
        projectEnd: '',
        task1: '',
      }],
    },
  })
  const {
    handleSubmit,
    control,
    resetField,
    getValues,
    formState: { isSubmitted },
  } = formMethods

  const educationFields = useFieldArray({
    name: 'education',
    control,
    rules: { maxLength: 3 },
  })

  const experienceFields = useFieldArray({
    name: 'experience',
    control,
    rules: { maxLength: 3 },
  })

  const projectsFields = useFieldArray({
    name: 'projects',
    control,
    rules: { maxLength: 3 },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
    if (downloadTemplateRef.current) {
      downloadTemplateRef.current.click()
    }
  }

  const appendEductionFields = () => {
    educationFields.append({
      university: '',
      universityLocation: '',
      universityStart: '',
      universityEnd: '',
      specialization: '',
    })
  }

  const removeEducationFields = (index: number) => {
    educationFields.remove(index)
  }

  const appendExperienceFields = () => {
    experienceFields.append({
      position: '',
      organization: '',
      experienceStart: '',
      experienceEnd: '',
      task1: '',
    })
  }

  const removeExperienceFields = (index: number) => {
    experienceFields.remove(index)
  }

  const appendProjectsFields = () => {
    projectsFields.append({
      projectName: '',
      stack: '',
      projectStart: '',
      projectEnd: '',
      task1: '',
    })
  }

  const removeProjectsFields = (index: number) => {
    projectsFields.remove(index)
  }

  return (
    <div className={styles.container}>
      <div style={{ display: 'none' }}>
        <PDFViewer>
          <ResumeTemplate {...getValues()} />
        </PDFViewer>
      </div>
      <FormProvider {...formMethods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h3>Общая информация</h3>
          <div className={styles.formBlock}>
            <ControlledTextField name='name' label='ФИО' labelType='moving' rules={{ required: 'Поле не заполнено' }} />
            <ControlledTextField name='phone' label='Номер телефона' labelType='moving' type='tel'
                                 rules={{ required: 'Поле не заполнено' }} />
            <ControlledTextField name='email' label='E-mail' labelType='moving' type='email'
                                 rules={{ required: 'Поле не заполнено' }} />
            <ControlledTextField name='github' label='Ссылка на gitHub' labelType='moving'
                                 rules={{ required: 'Поле не заполнено' }} />
          </div>
          <span className={styles.divider}></span>
          <h3>Образование</h3>
          {educationFields.fields.map((field, index) => {
            return <EducationBox
              index={index}
              key={field.id}
              removeFields={removeEducationFields}
            />
          })}
          {getValues('education').length < 3 &&
            <button className={styles.addBtn} type='button' onClick={appendEductionFields}>
              <img src='/icons/plus.png' alt='#' />
            </button>
          }
          <span className={styles.divider}></span>
          <h3>Опыт работы</h3>
          {experienceFields.fields.map((field, index) => {
            return <ExperienceBox
              resetField={resetField}
              index={index}
              key={field.id}
              removeFields={removeExperienceFields}
            />
          })}
          {getValues('experience').length < 3 &&
            <button className={styles.addBtn} type='button' onClick={appendExperienceFields}>
              <img src='/icons/plus.png' alt='#' />
            </button>
          }
          <span className={styles.divider}></span>
          <h3>Собственные проекты</h3>
          {projectsFields.fields.map((field, index) => {
            return <ProjectsBox
              resetField={resetField}
              index={index}
              key={field.id}
              removeFields={removeProjectsFields}
            />
          })}
          {getValues('projects').length < 3 &&
            <button className={styles.addBtn} type='button' onClick={appendProjectsFields}>
              <img src='/icons/plus.png' alt='#' />
            </button>
          }
          <span className={styles.divider}></span>
          <h3>Навыки</h3>
          <div className={styles.formBlock}>
            <ControlledTextField name='languages' label='Языки программирования' labelType='moving'
                                 rules={{ required: 'Поле не заполнено' }} />
            <ControlledTextField name='frameworks' label='Фреймворки' labelType='moving'
                                 rules={{ required: 'Поле не заполнено' }} />
            <ControlledTextField name='libraries' label='Библиотеки' labelType='moving'
                                 rules={{ required: 'Поле не заполнено' }} />
          </div>
          <button className={styles.submitBtn} type='submit'>Сохранить</button>
            <PDFDownloadLink document={<ResumeTemplate {...getValues()} />} fileName='resume.pdf'>
              <div ref={downloadTemplateRef}></div>
            </PDFDownloadLink>
        </form>
      </FormProvider>
    </div>
  )
}
