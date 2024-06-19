import React, { useEffect, useState, useRef } from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useForm, FormProvider } from 'react-hook-form';
import { Inputs } from '../authorization-form/types/Inputs';
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field';
import SearchIcon from '@mui/icons-material/Search';
import User from './components/User';
import { usersData } from './data/data';
import UserAvatar from '../../components/user-avatar/User-avatar';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setActiveUser } from '../../store/reducers/chat-slise';
import SendIcon from '@mui/icons-material/Send';
import styles from './Chat.module.scss';

interface Message {
    text: string;
    user?: string;
    timestamp?: string;
}

export const Chat: React.FC = () => {
    const [fileName, setFileName] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const activeUser = useAppSelector((state) => state.chatReducer.activeUser);
    const dispatch = useAppDispatch();

    const formMethods = useForm<Inputs>({ mode: 'onBlur' });

    const connectionRef = useRef<HubConnection | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null); 

    const handleUserClick = (user: any) => {
        dispatch(setActiveUser(user));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const filteredUsers = usersData.filter(user =>
        user.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl('http://31.28.113.222:8444/chat', { accessTokenFactory: () => '11' })
            .configureLogging(LogLevel.Information)
            .build();

        connection.start()
            .then(() => console.log('Connection started'))
            .catch(error => console.log('Error establishing connection', error));

        connection.on('Send', (message: string) => {
            console.log(message);
            setMessages(prevMessages => [...prevMessages, { text: message }]);
        });

        connectionRef.current = connection;

        return () => {
            connection.stop().then(() => console.log('Connection stopped'));
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]); 

    const handleSendMessage = () => {
        if (fileName.trim() && activeUser) {
            const message = { text: fileName };
            connectionRef.current?.invoke('Send', fileName)
                .catch(err => console.error('Error sending message:', err));
            setMessages(prevMessages => [...prevMessages, message]);
            setFileName('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            handleSendMessage();
        }
    };

    return (
        <FormProvider {...formMethods}>
            <div className={styles.container}>
                <div className={styles.chat}>
                    <div className={styles.navbar}>
                        <div className={styles.header}>
                            <ControlledTextField name='поиск' labelType='static' sx={{ width: '240px' }} onChange={handleSearchChange} />
                            <SearchIcon fontSize='large' />
                        </div>
                        <div className={styles.users}>
                            {filteredUsers.map((user) => (
                                <div onClick={() => handleUserClick(user)} key={user.id}>
                                    <User title={user.title} message={user.message} time={user.time} avatar={user.avatar} />
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
                            <div className={styles.messages}>
                                {messages.map((msg, index) => (
                                    <div key={index} className={styles.message}>
                                        <strong>{msg.user}:</strong> {msg.text}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} /> 
                            </div>
                            <div className={styles.chatFooter}>
                                <div className={styles.tools}>
                                    <input
                                        type="text"
                                        placeholder='Введите сообщение...'
                                        value={fileName}
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className={styles.buttons}>
                                    <SendIcon onClick={handleSendMessage} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </FormProvider>
    );
};
