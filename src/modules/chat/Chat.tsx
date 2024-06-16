import { } from 'react';
import styles from './Chat.module.scss';
import { useForm, FormProvider } from 'react-hook-form';
import { Inputs } from '../authorization-form/types/Inputs.ts';
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field.tsx';
import SearchIcon from '@mui/icons-material/Search';
import User from './components/User.tsx';
import { usersData } from './data/data.ts';
import UserAvatar from '../../components/user-avatar/User-avatar.tsx';
import { useAppDispatch } from '../../hooks/redux-hooks.ts';
import { setActiveUser } from '../../store/reducers/chat-slise.ts';
import { useAppSelector } from '../../hooks/redux-hooks.ts';
export const Chat = () => {
        
    const dispatch = useAppDispatch();
    const formMethods = useForm<Inputs>({ mode: 'onBlur' });

    const { formState: { } } = formMethods;
    const activeUser = useAppSelector((state) => state.chatReducer.activeUser);
    console.log(activeUser)

    const handleUserClick = (user: object) => {
        console.log(user)
        dispatch(setActiveUser(user));
    };
    return (
        <FormProvider {...formMethods}>
            <div className={styles.container}>
                <div className={styles.chat}>
                    <div className={styles.navbar}>
                        <div className={styles.header}>
                            <ControlledTextField name='поиск' label='Поиск' labelType='moving' sx={{ width: '240px' }} />
                            <SearchIcon fontSize='large' />
                        </div>
                        <div className={styles.users}>
                            {usersData.map((user) => (
                                <div onClick={() => handleUserClick(user)}>
                                    <User key={user.id} title={user.title} message={user.message} time={user.time} avatar={user.avatar} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {activeUser && ( 
                        <div className={styles.chatBody}>
                            <div className={styles.chatHeader}>
                                <div className={styles.ff}>
                                    <UserAvatar avatar={activeUser.avatar} />
                                    <div className={styles.info}>
                                        <p>{activeUser.title}</p>
                                        <p>{activeUser.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </FormProvider>
    );
};
