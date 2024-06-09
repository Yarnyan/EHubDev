import react, {useState} from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field.tsx'
import { Inputs } from '../authorization-form/types/Inputs.ts'
import styles from './Builder.module.scss'
import jsPDF from 'jspdf'
export const Builder = () => {
    const formMethods = useForm<Inputs>({ mode: 'onBlur' })
    const {
        handleSubmit,
        getValues,
        reset,
        // setError,
        formState: { },
    } = formMethods
    const generatePDF = () => {
        const doc = new jsPDF()

        doc.text('Education', 10, 10)
        doc.text(`About: `, 10, 20)
        doc.text(`Email: `, 10, 30)

        doc.text('Experience', 10, 50)

        doc.text('Project', 10, 70)

        doc.save('resume.pdf')
    }
    return (
        <FormProvider {...formMethods}>
            <div className={styles.container}>
                <div className={styles.inputs}>
                    <div className={styles.education}>
                        <div className={styles.title}>
                            <p>Education</p>
                        </div>
                        <div className={styles.input}>
                            <ControlledTextField
                                sx={{ width: '100%', marginTop: '10px' }}
                                labelType='static'
                                name='about'
                                label='Расскажите о вашем образовании'
                            />
                        </div>
                        <div className={styles.input}>
                            <ControlledTextField
                                sx={{ width: '100%', marginTop: '10px' }}
                                labelType='static'
                                name='email'
                                label='Расскажите о себе'
                            />
                        </div>
                        <div className={styles.input}>
                            <ControlledTextField
                                sx={{ width: '100%', marginTop: '10px' }}
                                labelType='static'
                                name='email'
                                label='Откуда вы?'
                            />
                        </div>
                        <div className={styles.input}>
                            <ControlledTextField
                                sx={{ width: '100%', marginTop: '10px' }}
                                labelType='static'
                                name='email'
                                label='Где сейчас проживаете?'
                            />
                        </div>
                    </div>
                    <div className={styles.Experience}>
                        <div className={styles.title}>
                            <p className={styles.subtitle}>Experience</p>
                        </div>
                        <div className={styles.input}>
                            <ControlledTextField
                                sx={{ width: '100%', marginTop: '10px' }}
                                labelType='static'
                                name='email'
                                label='Какой у вас стэк?'
                            />
                        </div>
                        <div className={styles.input}>
                            <ControlledTextField
                                sx={{ width: '100%', marginTop: '10px' }}
                                labelType='static'
                                name='email'
                                label='Что сейчас изучаете?'
                            />
                        </div>
                    </div>
                    <div className={styles.Project}>
                        <div className={styles.title}>
                            <p className={styles.subtitle}>Project</p>
                        </div>
                        <div className={styles.input}>
                            <ControlledTextField
                                sx={{ width: '100%', marginTop: '10px' }}
                                labelType='static'
                                name='email'
                                label='Расскажите о своих проектах'
                            />
                        </div>
                        <div className={styles.input}>
                            <ControlledTextField
                                sx={{ width: '100%', marginTop: '10px' }}
                                labelType='static'
                                name='email'
                                label='Расскажите о своих проектах'
                            />
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button>Cохранить</button>
                        <button type="button" onClick={() => generatePDF()}>Скачать</button>
                    </div>
                </div>
                <div className={styles.resume}>
                    <img src="/image/resume.png" alt="" />
                </div>
            </div>
        </FormProvider>
    )
}
