import React, { useState } from 'react';
import styles from './Search.module.scss';
import { useForm, FormProvider } from 'react-hook-form';
import { Inputs } from '../authorization-form/types/Inputs.ts';
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field.tsx';
import Card from '../../components/Search/Card.tsx';
import Order from '../../components/Search/Order.tsx';
import { data } from './data/data.ts';
import { orderData } from './data/data.ts';

export const Search = () => {
    const formMethods = useForm<Inputs>({ mode: 'onBlur' });
    const {
        handleSubmit,
        getValues,
        reset,
        // setError,
        formState: { },
    } = formMethods;
    const user = 'seller';
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = data.filter((item) => {
        const description = item.description.toLowerCase();
        const query = searchQuery.toLowerCase();
        return description.includes(query);
    });

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <FormProvider {...formMethods}>
            <div className={styles.container}>
                <div className={styles.input}>
                    <ControlledTextField
                        sx={{ width: '100%', marginTop: '10px' }}
                        labelType='static'
                        name='about'
                        label='Кого вы хотите найти?'
                        changeHandler={handleSearch}
                    />
                </div>
                {user === 'seller' ? (
                    filteredData.map((item) => (
                        <Card
                            title={item.title}
                            description={item.description}
                            position={item.position}
                            key={item.id}
                        />
                    ))
                ) : (
                    orderData.map((item) => {
                        return (
                            <Order
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                key={item.id}
                            />
                        )
                    })
                )}
            </div>
        </FormProvider>
    );
};