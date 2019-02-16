import React from 'react';
import styles from './ChatRoom.module.css';
import { RouteComponentProps } from 'react-router';

interface ChatRoomProps extends RouteComponentProps<{ roomName: string }> {}

const ChatRoom = (props: ChatRoomProps) => {
  const { match } = props;
  return (
    <div className={styles.container}>ChatRoom: {match.params.roomName}</div>
  );
};

export default ChatRoom;
