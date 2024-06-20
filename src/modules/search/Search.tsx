import styles from './Search.module.scss';
import { useForm, FormProvider } from 'react-hook-form';
import { Inputs } from '../authorization-form/types/Inputs.ts';
import Card from './components/Card.tsx';
import Order from './components/Order.tsx';
import { useAppSelector } from '../../hooks/redux-hooks.ts'
import { data, orderData } from './data/data.ts';
import { User } from '../../models/User.ts'
import { ControlledSelect } from '../../components/controlled-select/Controlled-select.tsx';

// import { useGetVacancyQuery, useGetUserByIdQuery } from './api/vacancy-api.ts';
export const Search = () => {
    const formMethods = useForm<Inputs>({ mode: 'onBlur' });
    const { handleSubmit, getValues, reset, formState: { } } = formMethods;

    const { isLoading, vacancyData, error } = useGetVacancyQuery();

    // const { isData: userId  } = useGetUserByIdQuery(2 as number);

    const { type } = useAppSelector(state => state.userReducer.user as User)


    return (
        <FormProvider {...formMethods}>
            <div className={styles.container}>
                <div className={styles.input}>
                    <ControlledSelect
                        sx={{ width: '260px' }}
                        label='Специализация'
                        name='specialization'
                        options={[
                            { value: '', content: 'Любая' },
                            { value: 'Frontend', content: 'Frontend' },
                            { value: 'Backend', content: 'Backend' },
                        ]}
                    />
                    <ControlledSelect
                        sx={{ width: '260px' }}
                        label='Опыт'
                        name='expertise'
                        options={[
                            { value: '', content: 'Не важен' },
                            { value: '5 лет', content: 'Более 5 лет' },
                            { value: '10 лет', content: 'Более 10 лет' },
                        ]}
                    />
                </div>
                {type === 'user' ? (
                    data.map((item) => (
                        <Card
                            title={item.title}
                            description={item.description}
                            position={item.position}
                            key={item.id}
                            expertise={item.expertise}
                            userId={item.userId}
                        />
                    ))
                ) : (
                    orderData.map((item) => (
                        <Order
                            title={item.title}
                            description={item.description}
                            key={item.id}
                            expertise={item.expertise}
                            pay={item.pay}
                            userId={item.userId}
                        />
                    ))
                )}
            </div>
        </FormProvider>
    );
};
