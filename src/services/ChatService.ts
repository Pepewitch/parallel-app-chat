import SocketIOClient from 'socket.io-client';
import { Message } from '../types/Chat';
import SocketService from './SocketService';
import { useState, useEffect } from 'react';

export default class ChatService {
  public static getSocket() {
    return SocketService.getSocket(['chat']);
  }
  public static send(text: string) {
    const message: Message = {
      text,
      sender: 'eiei',
      timestamp: new Date(),
    };
    this.getSocket().emit('message', message);
  }
  public static useMessages() {
    const [messages] = useState<Message[]>([]);
    const [key, setKey] = useState(Math.random());
    useEffect(() => {
      const chatHandler = (message: Message) => {
        messages.push(message);
        setKey(Math.random());
      };
      this.getSocket().on('message', chatHandler);
      return () => {
        this.getSocket().removeListener('message', chatHandler);
      };
    }, []);
    return { messages };
  }
}
