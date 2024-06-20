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
    const dispatch = useAppDispatch();

    const formMethods = useForm<Inputs>({ mode: 'onBlur' });

    const connectionRef = useRef<HubConnection | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const token = localStorage.getItem('token');

    const { data: chats } = useGetChatsQuery(token);

    console.log(chats)

    const { data: gg } = useGetAllMessagesQuery(activeChatId);  

    const [sendMessage, { isLoading, error }] = useSendMessageMutation();

    const handleUserClick = (user: any) => {
      dispatch(setActiveUser(user));
      dispatch(setActiveChatId(user.id))
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

    // const handleSendMessage = () => {
    //     // if (fileName.trim() && activeUser) {
    //     //     const message = { text: fileName };
    //     //     connectionRef.current?.invoke('Send', fileName)
    //     //         .catch(err => console.error('Error sending message:', err));
    //     //     setMessages(prevMessages => [...prevMessages, message]);
    //     //     setFileName('');
    //     // }
        
    // };
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

    useEffect(() => {
        if (gg && gg.length > 0) {
            const latestMessage = gg[gg.length - 1];
            setFromUserId(latestMessage.fromId);
        }
    }, [gg]);


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
                                chats.map((chat) =>
                                (
                                    <div onClick={() => handleUserClick(chat)} key={chat.id}>
                                        <User title={chat.user1?.username} message={chat.user1?.hashPassword} time={chat.lastMessageTime} avatar={chat.avatar} />
                                    </div>
                                ))
                            ) : (
                                <div className={styles.noUsers}>Пока что нет активных чатов</div>
                            )}
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
                                {gg.map((msg, index) => (
                                    <div key={index} className={styles.message}>
                                        <div className={styles.avatar}>
                                            <UserAvatar avatar='' />
                                        </div>
                                        <div>
                                            <div className={styles.infoUser}>
                                                <p>{msg.user}</p>
                                                <p>19:20</p>
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
