import { useForm, FormProvider } from 'react-hook-form'
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field.tsx'
import { Inputs } from '../authorization-form/types/Inputs.ts'
import styles from './Builder.module.scss'
export const Builder = () => {
    const formMethods = useForm<Inputs>({ mode: 'onBlur' })

    const {
        handleSubmit,
        getValues,
        reset,
        // setError,
        formState: { },
    } = formMethods

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
                </div>
                <div className={styles.resume}>
                    <img src="/image/resume.png" alt="" />
                </div>
            </div>
        </FormProvider>
    )
}
