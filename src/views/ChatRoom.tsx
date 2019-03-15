import React from 'react';
import styles from './ChatRoom.module.css';
import { RouteComponentProps } from 'react-router';
import ChatBox from '../components/ChatBox';

interface ChatRoomProps extends RouteComponentProps<{ roomName: string }> {
  username: string;
}

const ChatRoom = (props: ChatRoomProps) => {
  const { match, username } = props;

  return (
    <div className={styles.container}>
      <span>ChatRoom: {match.params.roomName}</span>
      <ChatBox room={match.params.roomName} username={username} />
    </div>
  );
};

export default ChatRoom;
