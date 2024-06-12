import { useState } from 'react';
import styles from './Search.module.scss';
import { useForm, FormProvider } from 'react-hook-form';
import { Inputs } from '../authorization-form/types/Inputs.ts';
import Card from './components/Card.tsx';
import Order from './components/Order.tsx';
import { data, orderData } from './data/data.ts';
import { ControlledSelect } from '../../components/controlled-select/Controlled-select.tsx';

export const Search = () => {
    const formMethods = useForm<Inputs>({ mode: 'onBlur' });
    const { handleSubmit, getValues, reset, formState: {} } = formMethods;
    const user = 'seller';

    const [searchQuery, setSearchQuery] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [expertise, setExpertise] = useState('');

    const handleSpecializationChange = (e) => {
        setSpecialization(e.target.value);
    };

    const handleExpertiseChange = (e) => {
        setExpertise(e.target.value);
    };

    const filteredData = data.filter((item) => {
        return (
            (specialization === '' || item.position === specialization) &&
            (expertise === '' || item.expertise === expertise)
        );
    });

    const filteredOrderData = orderData.filter((item) => {
        return (
            (specialization === '' || item.position === specialization) &&
            (expertise === '' || item.expertise === expertise)
        );
    });

    return (
        <FormProvider {...formMethods}>
            <div className={styles.container}>
                <div className={styles.input}>
                    <ControlledSelect
                        sx={{ width: '260px', marginRight: '20px' }}
                        label='Специализация'
                        name='specialization'
                        options={[
                            { value: '', content: 'Любая' },
                            { value: 'Frontend', content: 'Frontend' },
                            { value: 'Backend', content: 'Backend' },
                        ]}
                        handleChange={handleSpecializationChange}
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
                        handleChange={handleExpertiseChange}
                    />
                </div>
                {user === 'seller' ? (
                    filteredData.map((item) => (
                        <Card
                            title={item.title}
                            description={item.description}
                            position={item.position}
                            key={item.id}
                            expertise={item.expertise}
                        />
                    ))
                ) : (
                    filteredOrderData.map((item) => (
                        <Order
                            title={item.title}
                            description={item.description}
                            position={item.position}
                            key={item.id}
                            expertise={item.expertise}
                        />
                    ))
                )}
            </div>
        </FormProvider>
    );
};
