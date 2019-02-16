import { Message } from '../types/Chat';
import SocketService from './SocketService';
import { useState, useEffect } from 'react';

export default class ChatService {
  public static getSocket() {
    const socket = SocketService.getSocket(['chat']);
    return socket;
  }
  public static send(text: string, roomId: string) {
    const message: Message = {
      text,
      sender: 'eiei',
      timestamp: new Date(),
    };
    this.getSocket().emit('message', { roomId, message });
  }
  public static useMessages(room = 'global') {
    const [messages] = useState<Message[]>([]);
    const [key, setKey] = useState([]);
    useEffect(() => {
      const chatHandler = (message: Message) => {
        messages.push(message);
        setKey([]);
      };
      const socket = this.getSocket();
      socket.emit('join', room);
      socket.on('message', chatHandler);
      return () => {
        socket.removeListener('message', chatHandler);
      };
    }, []);
    return { messages };
  }
}
