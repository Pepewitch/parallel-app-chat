import React, { useState } from 'react';
import { Message } from '../../types/Chat';
import { ReactComponent as Send } from '../../assets/icons/baseline-send-24px.svg';
import ChatService from '../../services/ChatService';
import styles from './TypingBox.module.css';

interface TypingBoxProps {
  room: string;
  username: string;
  onFocus: () => any;
  onSubmit: () => any;
}

const TypingBox = (props: TypingBoxProps) => {
  const { room, username, onFocus, onSubmit } = props;
  const [text, setText] = useState('');
  const send = () => {
    ChatService.send(text, room, username);
    onSubmit();
    setText('');
  };
  return (
    <form
      className={styles.typing_container}
      onSubmit={e => {
        e.preventDefault();
        send();
      }}
    >
      <input
        value={text}
        onFocus={onFocus}
        onChange={e => setText(e.target.value)}
        className={styles.text_input}
      />
      <Send
        width={24}
        height={24}
        className={styles.send}
        onClick={() => send()}
      />
    </form>
  );
};

export default TypingBox;
