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
  messages.sort((a, b) =>
    new Date(a.timestamp) > new Date(b.timestamp) ? 1 : -1,
  );
  const lastRead = ChatService.useRead(username, room);
  const head = <div className={styles.head}>{room}</div>;
  return (
    <div
      className="card "
      style={{ padding: '0px 0px 0px 0px', borderRadius: '5px' }}
    >
      {head}
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
