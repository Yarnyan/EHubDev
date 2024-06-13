import { useForm, FormProvider, SubmitHandler, useFieldArray } from 'react-hook-form'
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field.tsx'
import styles from './Builder.module.scss'
import jsPDF from 'jspdf'
import { EducationBox } from './components/education-box/Education-box.tsx'

interface Inputs {
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
      }]
    },
  })
  const {
    handleSubmit,
    control,
  } = formMethods

  const educationFields = useFieldArray({
    name: 'education',
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
            appendEductionFields={appendEductionFields}
            removeEductionFields={removeEducationFields}
          />
        })}
        <button type='submit'>принять</button>
      </form>
    </FormProvider>
  )
}
