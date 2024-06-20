import React, { useEffect, useState, useRef } from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useForm, FormProvider } from 'react-hook-form';
import { Inputs } from '../authorization-form/types/Inputs';
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field';
import User from './components/User';
import UserAvatar from '../../components/user-avatar/User-avatar';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setActiveUser, setActiveChatId } from '../../store/reducers/chat-slise';
import SendIcon from '@mui/icons-material/Send';
import styles from './Chat.module.scss'
import { useGetAllMessagesQuery, useGetChatsQuery, useSendMessageMutation } from './api/chat-api';
import AddIcon from '@mui/icons-material/Add';
import Modal from './components/Modal';
interface Message {
    text: string;
    user?: string;
    timestamp?: string;
}

export const Chat = () => {
    const [fileName, setFileName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [fromUserId, setFromUserId] = useState<number | null>(null);
    const activeUser = useAppSelector((state) => state.chatReducer.activeUser);
    const activeChatId = useAppSelector((state) => state.chatReducer.activeChatId);
    const [id, setId] = useState<number | null>(null);
    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.userReducer.user as User)

    const formMethods = useForm<Inputs>({ mode: 'onBlur' });

    const connectionRef = useRef<HubConnection | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const token = localStorage.getItem('token');

    const { data: chats } = useGetChatsQuery(token);

    const { data: gg } = useGetAllMessagesQuery(id, {
        skip: !id,
    }); // норм вариант

    const [sendMessage] = useSendMessageMutation();

    const handleUserClick = (user: any) => {
        console.log(user)
        dispatch(setActiveUser(user));
        dispatch(setActiveChatId(user.id))
        setId(user.id);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl('http://31.28.113.222:8443/chat/hub', {
                accessTokenFactory: () => Promise.resolve(token || '')
            })
            .configureLogging(LogLevel.Information)
            .build();

        connection.start()
            .then(() => console.log('Connection started'))
            .catch(error => console.log('Error establishing connection', error));

        connection.on('Send', (message: string) => {
            console.log(message);
            setMessages(prevMessages => [...prevMessages, { text: message }]);
        });

        connection.on('notify', (notification: string) => {
            console.log('Notification received:', notification);
            setNotifications(prevNotifications => [...prevNotifications, notification]);
        });

        connectionRef.current = connection;

        return () => {
            connection.stop().then(() => console.log('Connection stopped'));
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (fileName.trim() && activeUser) {
            try {
                await sendMessage({
                    activeId: 20,
                    message: fileName,
                    token: localStorage.getItem('token') || '',
                });
                setFileName('');
            } catch (err) {
                console.error('Error sending message:', err);
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    function extractTime(timeSpan: string): string {
        const parts = timeSpan.split('.');
        const timePart = parts[1];
        const [hours, minutes, seconds] = timePart.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    }

    console.log(activeUser)

    return (
        <FormProvider {...formMethods}>
            <div className={styles.container}>
                <div className={styles.chat}>
                    <div className={styles.navbar}>
                        <div className={styles.header}>
                            <ControlledTextField name='поиск' labelType='static' sx={{ width: '240px' }} onChange={handleSearchChange} />
                            <AddIcon fontSize='large' onClick={handleOpenModal} style={{ cursor: 'pointer' }} />
                        </div>
                        <div className={styles.users}>
                            {chats && Array.isArray(chats) ? (
                                chats.map((chat) => {
                                    const user = chat.user1 || chat.user2;
                                    const displayStyle = user ? 'block' : 'flex';
                                    console.log(chat)
                                    return (
                                        <div onClick={() => handleUserClick(chat)} key={chat.id} style={{ display: displayStyle }}>
                                            {user && (
                                                <User
                                                    title={user.username}
                                                    message={user.hashPassword}
                                                    time={user.lastMessageTime}
                                                    avatar={user.avatar}
                                                />
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className={styles.noUsers}>Пока что нет активных чатов</div>
                            )}
                        </div>

                    </div>
                    {activeUser && (
                        <div className={styles.chatBody}>
                            <div className={styles.chatHeader}>
                                <div className={styles.ff}>
                                    <UserAvatar
                                        avatar={
                                            activeUser.user1?.avatar !== null && activeUser.user1?.avatar !== 'null'
                                                ? 'http://31.28.113.222:8444/' + activeUser.user1?.avatar
                                                : activeUser.user2?.avatar !== null && activeUser.user2?.avatar !== 'null'
                                                    ? 'http://31.28.113.222:8444/' + activeUser.user2?.avatar
                                                    : null
                                        }
                                    />
                                    <div className={styles.info}>
                                        <p>{activeUser.user1?.username ? activeUser.user1?.username : activeUser.user2.username}</p>
                                        <p>{activeUser.status}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.messages}>
                                {gg && gg.map((msg, index) => (
                                    <div key={index} className={styles.message}>
                                        <div className={styles.avatar}>
                                            {activeUser && (
                                                <UserAvatar
                                                    avatar={
                                                        msg.fromId === activeUser.user1?.id
                                                            ? activeUser.user1?.avatar
                                                                ? 'http://31.28.113.222:8444/' + activeUser.user1.avatar
                                                                : null
                                                            : msg.fromId === activeUser.user2?.id
                                                                ? activeUser.user2?.avatar
                                                                    ? 'http://31.28.113.222:8444/' + activeUser.user2.avatar
                                                                    : null
                                                                : userData?.avatar
                                                    }
                                                />
                                            )}
                                        </div>
                                        <div style={{ width: '100%' }}>
                                            <div className={styles.infoUser}>
                                                <p>
                                                    {activeUser && (
                                                        msg.fromId === activeUser.user1?.id
                                                            ? activeUser.user1?.username
                                                            : msg.fromId === activeUser.user2?.id
                                                                ? activeUser.user2?.username
                                                                : userData?.username
                                                    )}
                                                </p>
                                                <p>{extractTime(msg.timeSpan)}</p>
                                            </div>
                                            <div className={styles.infoMessage}>
                                                <p>{msg.text}</p>
                                            </div>
                                        </div>
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
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
        </FormProvider>
    );
};
