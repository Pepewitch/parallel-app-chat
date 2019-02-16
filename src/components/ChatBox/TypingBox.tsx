import React, { useState } from 'react';
import { Message } from '../../types/Chat';
import { ReactComponent as Send } from '../../assets/icons/baseline-send-24px.svg';
import ChatService from '../../services/ChatService';
import styles from './TypingBox.module.css';

const TypingBox = () => {
  const [text, setText] = useState('');
  const send = () => {
    ChatService.send(text);
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
