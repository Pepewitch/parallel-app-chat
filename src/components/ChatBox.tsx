import React, { useState, useEffect } from 'react';
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
    console.log(text.length);
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
  return (
    <div className={styles.container}>
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
  const messages = [];
  for (let i = 0; i < 20; i++) {
    messages.push({ sender: 'sender', text: 'text', timestamp: new Date() });
  }
  useEffect(() => {
    const chatHandler = (message: Message) => {
      console.log(message);
    };
    ChatService.getSocket('chat').on('message', chatHandler);

    return () => {
      ChatService.getSocket('chat').removeListener('message', chatHandler);
    };
  }, []);
  return (
    <div className={styles.container}>
      <TextBox messages={messages} />
      <TypingBox />
    </div>
  );
};

export default ChatBox;
