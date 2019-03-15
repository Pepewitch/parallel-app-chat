import React from 'react';
import styles from './ChatBox.module.css';
import ChatService from '../../services/ChatService';
import TextBox from './TextBox';
import TypingBox from './TypingBox';

interface ChatBoxProps {
  room: string;
  username: string;
}

const ChatBox = (props: ChatBoxProps) => {
  const { room, username } = props;
  const { messages } = ChatService.useMessages(username, room);
  console.log(messages);
  return (
    <div className={styles.container}>
      <TextBox messages={messages} />
      <TypingBox room={room} username={username} />
    </div>
  );
};

export default ChatBox;
