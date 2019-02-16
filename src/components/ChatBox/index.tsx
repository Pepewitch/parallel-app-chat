import React from 'react';
import styles from './ChatBox.module.css';
import ChatService from '../../services/ChatService';
import TextBox from './TextBox';
import TypingBox from './TypingBox';

interface ChatBoxProps {
  room: string;
}

const ChatBox = (props: ChatBoxProps) => {
  const { room } = props;
  const { messages } = ChatService.useMessages(room);
  return (
    <div className={styles.container}>
      <TextBox messages={messages} />
      <TypingBox room={room} />
    </div>
  );
};

export default ChatBox;
