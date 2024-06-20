import React, { useState } from 'react';
import styles from './Modal.module.scss';
import { useSendMessageMutation } from '../api/chat-api';
import { useAppSelector } from '../../../hooks/redux-hooks';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const token = localStorage.getItem('token');
    const [message, setMessage] = useState('');
    const [sendMessage] = useSendMessageMutation();
    
    const activeId = useAppSelector((state) => state.chatReducer.activeId);
    
    const handleSubmit = async () => {
        try {
            console.log(message);
            await sendMessage({ activeId, message, token }).unwrap();
            onClose();
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                <h2>Введите данные</h2>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        id="input1"
                        value={activeId || ''}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Введите имя'
                        disabled
                    />
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        id="input2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder='Введите сообщение'
                    />
                </div>
                <button className={styles.submitButton} onClick={handleSubmit}>
                    Отправить
                </button>
            </div>
        </div>
    );
};

export default Modal;
