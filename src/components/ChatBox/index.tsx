import React from 'react';
import styles from './ChatBox.module.css';
import ChatService from '../../services/ChatService';
import TextBox from './TextBox';
import TypingBox from './TypingBox';

const ChatBox = () => {
  const { messages } = ChatService.useMessages();
  return (
    <div className={styles.container}>
      <TextBox messages={messages} />
      <TypingBox />
    </div>
  );
};

export default ChatBox;
