import React, { createRef, useEffect } from 'react';
import { Message } from '../../types/Chat';
import styles from './TextBox.module.css';

interface TextBoxProps {
  messages: Message[];
  lastRead: Date;
}

const TextBox = (props: TextBoxProps) => {
  const { messages, lastRead } = props;
  const container = createRef<HTMLDivElement>();
  useEffect(() => {
    if (container.current) {
      container.current.scrollTop = container.current.scrollHeight;
    }
  });
  return (
    <div className={styles.textbox_container} ref={container}>
      {messages
        .map(message => ({
          ...message,
          timestamp: new Date(message.timestamp),
        }))
        .map((message, index) => (
          <div
            key={`${index}${message.timestamp}`}
            className={styles.text_container}
          >
            <span className={styles.sender}> {message.sender} :</span>{' '}
            <span>{message.text}</span>
            {message.timestamp < lastRead ? '(READ)' : null}
          </div>
        ))}
    </div>
  );
};
export default TextBox;
