import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field.tsx'
import { Inputs } from '../authorization-form/types/Inputs.ts'
import styles from './Builder.module.scss'
import jsPDF from 'jspdf'
export const Builder = () => {
    const formMethods = useForm<Inputs>({ mode: 'onBlur' })
    const {
        handleSubmit,
    } = formMethods

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
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
            <form>
                <button type='submit'>принять</button>
            </form>
        </FormProvider>
    )
}
