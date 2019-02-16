import React, { useState, useEffect, createRef } from 'react';
import styles from './ChatBox.module.css';
import { Message } from '../types/Chat';
import { ReactComponent as Send } from '../assets/icons/baseline-send-24px.svg';
import ChatService from '../services/ChatService';

interface TextBoxProps {
  messages: Message[];
}

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

const TextBox = (props: TextBoxProps) => {
  const { messages } = props;
  const container = createRef<HTMLDivElement>();
  useEffect(() => {
    if (container.current) {
      container.current.scrollTop = container.current.scrollHeight;
    }
  });
  return (
    <div className={styles.textbox_container} ref={container}>
      {messages.map((message, index) => (
        <div
          key={`${index}${message.timestamp}`}
          className={styles.text_container}
        >
          <span className={styles.sender}> {message.sender} :</span>{' '}
          <span>{message.text}</span>
        </div>
      ))}
    </div>
  );
};

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
