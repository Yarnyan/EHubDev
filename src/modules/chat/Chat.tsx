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
import styles from './Chat.module.scss';
import { useGetAllMessagesQuery, useGetChatsQuery, useSendMessageMutation } from './api/chat-api';
import { CircularProgress } from '@mui/material'
import Modal from './components/Modal';

interface Message {
    text: string;
    fromId: number;
    user: string;
    timestamp?: string;
    timeSpan?: string;
}

export const Chat = () => {
    const [fileName, setFileName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const activeUser = useAppSelector((state) => state.chatReducer.activeUser);
    const activeChatId = useAppSelector((state) => state.chatReducer.activeChatId);
    const [activeChat, setActiveChat] = useState<false>({});
    const [id, setId] = useState<number | null>(null);
    const dispatch = useAppDispatch();
    const [filteredChats, setFilteredChats] = useState<any[]>([]);
    const userData = useAppSelector(state => state.userReducer.user as User);

    const formMethods = useForm<Inputs>({ mode: 'onBlur' });

    const connectionRef = useRef<HubConnection | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const token = localStorage.getItem('token');

    const { data: chats, isLoading } = useGetChatsQuery(token);

    const { data: gg } = useGetAllMessagesQuery(id, {
        skip: !id,
    });

    const [sendMessage] = useSendMessageMutation();

    const handleUserClick = (user: any) => {
        setActiveChat(true)
        dispatch(setActiveUser(user));
        dispatch(setActiveChatId(user.id));
        setId(user.id);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(event.target.value);
    };

    const reorderChats = (chatId: number) => {
        setFilteredChats((prevChats) => {
            const updatedChats = prevChats.filter((chat) => chat.id !== chatId);
            const movedChat = prevChats.find((chat) => chat.id === chatId);
            return movedChat ? [movedChat, ...updatedChats] : prevChats;
        });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl(import.meta.env.VITE_API_CHAT_URL + '/chat/hub', {
                accessTokenFactory: () => Promise.resolve(token || '')
            })
            .configureLogging(LogLevel.Information)
            .build();

        connection.start()
            .then(() => console.log('Connection started'))
            .catch(error => console.log('Error establishing connection', error));

        connection.on('Receive', (message: string, userId: number, chatId: number, timeSpan: string) => {
            console.log(message, chatId);
            setMessages((prevMessages) => {
                const activeUsr = activeUser;
                const username = userId === activeUsr.user1?.id ? activeUsr.user1?.username : activeUsr.user2?.username;
                return [
                    ...prevMessages,
                    {
                        text: message,
                        fromId: userId,
                        user: username || '',
                        chatId: chatId,
                        timeSpan: extractTime(timeSpan),

                    }
                ];
            });
            reorderChats(chatId);
        });

        connectionRef.current = connection;

        return () => {
            connection.stop().then(() => console.log('Connection stopped'));
        };
    }, [activeUser, token]);

    useEffect(() => {
        if (chats) {
            setFilteredChats(chats);
        }
    }, [chats]);

    useEffect(() => {
        const filteredChats = chats?.filter((chat) => {
          const username = chat.user2?.username;
          return username?.toLowerCase().includes(searchValue.toLowerCase());
        });
        setFilteredChats(filteredChats ?? []);
      }, [searchValue, chats]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, gg]);

    const extractTime = (timeSpan: string): string => {
        const parts = timeSpan.split('.');
        const timePart = parts[1];
        const [hours, minutes] = timePart.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    };

    const handleSendMessage = async () => {
        if (fileName.trim() && activeUser) {
            const user1Id = activeUser.user1?.id;
            const user2Id = activeUser.user2?.id;
            const currentUserId = userData.id;

            let activeId;
            let activeUsername;

            if (user1Id !== undefined && user1Id !== currentUserId) {
                activeId = user1Id;
                activeUsername = activeUser.user1?.username;
            } else if (user2Id !== undefined && user2Id !== currentUserId) {
                activeId = user2Id;
                activeUsername = activeUser.user2?.username;
            } else {
                console.error('Could not determine activeId:', { user1Id, user2Id, currentUserId });
                return;
            }

            try {
                const tokenValue = localStorage.getItem('token');
                if (tokenValue) {
                    const response = await sendMessage({
                        activeId,
                        message: fileName,
                        token: tokenValue,
                    }).unwrap();

                    const newMessage: Message = {
                        text: fileName,
                        fromId: currentUserId,
                        user: userData.username,
                        timeSpan: extractTime(response.timeSpan)
                    };

                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                    setFileName('');
                } else {
                    console.error('Token not found');
                }
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
        setActiveChat(false);
      }, []);
    return (
        <FormProvider {...formMethods}>
            <div className={styles.container}>
                <div className={styles.chat}>
                    <div className={styles.navbar}>
                        <div className={styles.header}>
                            <input
                                type="text"
                                placeholder='Введите имя'
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>
                        <div className={styles.users}>
                            {
                                isLoading ? (
                                    <CircularProgress size={56} color='secondary' sx={{ marginTop: '60%', marginLeft: '40%' }} />
                                ) : (
                                    filteredChats && Array.isArray(filteredChats) ?
                                        filteredChats.map((chat) => {
                                            const user = chat.user2;
                                            const displayStyle = user ? 'block' : 'flex';
                                            return (
                                                <div
                                                    onClick={() => handleUserClick(chat)}
                                                    key={chat.id}
                                                    style={{ display: displayStyle }}
                                                >
                                                    {user && (
                                                        <User
                                                            title={user.username}
                                                            message={user.hashPassword}
                                                            time={user.lastMessageTime}
                                                            avatar={`${import.meta.env.VITE_API_URL}/${user.avatar}`}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        }) :
                                        <div className={styles.noUsers}>Пока что нет активных чатов</div>
                                )
                            }
                        </div>
                    </div>
                    {activeUser && activeChat && (
                        <div className={styles.chatBody}>
                            <div className={styles.chatHeader}>
                                <div className={styles.ff}>
                                    <UserAvatar
                                        avatar={
                                            import.meta.env.VITE_API_URL + '/' + activeUser.user2?.avatar
                                        }
                                    />
                                    <div className={styles.info}>
                                        <p>{activeUser.user2.username}</p>
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
                                                        import.meta.env.VITE_API_URL + '/' + (msg.fromId == activeUser.user1.id ? activeUser.user1.avatar : activeUser.user2.avatar)
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
                                {messages.map((msg, index) => {
                                    return (
                                        <div key={index} className={styles.message}>
                                            <div className={styles.avatar}>
                                                <UserAvatar
                                                    avatar={import.meta.env.VITE_API_URL + '/' + (msg.fromId === activeUser.user1.id ? activeUser.user1.avatar : activeUser.user2.avatar)} />
                                            </div>
                                            <div style={{ width: '100%' }}>
                                                <div className={styles.infoUser}>
                                                    <p>
                                                        {msg.fromId === activeUser.user1?.id
                                                            ? activeUser.user1?.username
                                                            : msg.fromId === activeUser.user2?.id
                                                                ? activeUser.user2?.username
                                                                : userData?.username}
                                                    </p>
                                                    <p>{msg.timeSpan}</p>
                                                </div>
                                                <div className={styles.infoMessage}>
                                                    <p>{msg.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
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
