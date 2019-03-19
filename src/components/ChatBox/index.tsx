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
  const lastRead = ChatService.useRead(username, room);
  return (
    <div className={styles.container}>
      <TextBox messages={messages} lastRead={lastRead} />
      <TypingBox
        room={room}
        username={username}
        onSubmit={() => {
          ChatService.read(username, room);
        }}
        onFocus={() => {
          ChatService.read(username, room);
        }}
      />
    </div>
  );
};

export default ChatBox;
