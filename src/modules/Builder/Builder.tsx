import { useForm, FormProvider, SubmitHandler, useFieldArray } from 'react-hook-form'
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field.tsx'
import styles from './Builder.module.scss'
import jsPDF from 'jspdf'
import { EducationBox } from './components/education-box/Education-box.tsx'
import { ExperienceBox } from './components/experience-box/Experience-box.tsx'
import { ProjectsBox } from './components/projects-box/Projects-box.tsx'

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
    organization: string
    experienceStart: string
    experienceEnd: string
    task1: string
  }[]
  projects: {
    projectName: string
    stack: string
    projectStart: string
    projectEnd: string
    task1: string
  }[]
  languages: string
  frameworks: string
  libraries: string
}

export const Builder = () => {
  const formMethods = useForm<Inputs>({
    mode: 'onBlur',
    defaultValues: {
      education: [{
        university: '',
        universityLocation: '',
        universityStart: '',
        universityEnd: '',
        specialization: ''
      }],
      experience: [{
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
      }]
    },
  })
  const {
    handleSubmit,
    control,
    resetField,
    getValues,
    formState: {}
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
  }

  const appendEductionFields = () => {
    educationFields.append({
      university: '',
      universityLocation: '',
      universityStart: '',
      universityEnd: '',
      specialization: ''
    })
  }

  const removeEducationFields = (index: number) => {
    educationFields.remove(index)
  }

  const appendExperienceFields = () => {
    experienceFields.append({
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
  // const generatePDF = () => {
  //     const doc = new jsPDF()
  //
  //     doc.text('Education', 10, 10)
  //     doc.text(`About: `, 10, 20)
  //     doc.text(`Email: `, 10, 30)
  //
  //     doc.text('Experience', 10, 50)
  //
  //     doc.text('Project', 10, 70)
  //
  //     doc.save('resume.pdf')
  // }
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Общая информация</p>
        <ControlledTextField name='name' label='ФИО' labelType='moving' />
        <ControlledTextField name='phone' label='Номер телефона' labelType='moving' type='tel' />
        <ControlledTextField name='email' label='E-mail' labelType='moving' type='email' />
        <ControlledTextField name='github' label='Ссылка на gitHub' labelType='moving' />
        {educationFields.fields.map((field, index) => {
          return <EducationBox
            index={index}
            key={field.id}
            removeFields={removeEducationFields}
          />
        })}
        {getValues('education').length < 3 &&
          <button type='button' onClick={appendEductionFields}>((+))</button>
        }
        {experienceFields.fields.map((field, index) => {
          return <ExperienceBox
            resetField={resetField}
            index={index}
            key={field.id}
            removeFields={removeExperienceFields}
          />
        })}
        {getValues('experience').length < 3 &&
          <button type='button' onClick={appendExperienceFields}>((+))</button>
        }
        {projectsFields.fields.map((field, index) => {
          return <ProjectsBox
            resetField={resetField}
            index={index}
            key={field.id}
            removeFields={removeProjectsFields}
          />
        })}
        {getValues('projects').length < 3 &&
          <button type='button' onClick={appendProjectsFields}>((+))</button>
        }
        <p>Навыки</p>
        <ControlledTextField name='languages' label='Языки программирования' labelType='moving' />
        <ControlledTextField name='frameworks' label='Фреймворки' labelType='moving' />
        <ControlledTextField name='libraries' label='Библиотеки' labelType='moving' />
        <button type='submit'>принять</button>
      </form>
    </FormProvider>
  )
}
