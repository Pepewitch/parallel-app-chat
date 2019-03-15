import { Message, InitialMessage } from '../types/Chat';
import SocketService from './SocketService';
import { useState, useEffect } from 'react';

export default class ChatService {
  public static getSocket(roomId: string, username: string) {
    const socket = SocketService.getSocket(['chat'], { roomId, username });
    return socket;
  }
  public static send(text: string, roomId: string, username: string) {
    const message: Message = {
      text,
      sender: username,
      timestamp: new Date(),
      roomId,
    };
    this.getSocket(roomId, username).emit('message', { roomId, message });
  }
  public static useMessages(username: string, room = 'global') {
    const [messages, setMessage] = useState<Message[]>([]);
    const [key, setKey] = useState([]);
    console.log('hello');
    useEffect(() => {
      const chatHandler = (message: Message) => {
        console.log({ message, messages });
        // setMessage([...messages, message]);
        if (message.roomId === room) {
          messages.push(message);
          setKey([]);
        }
      };
      const initConnectionHandler = (event: InitialMessage) => {
        const { read, messages: incomingMessages } = event;
        // console.log(event);
        // setMessage([...incomingMessages]);
        for (const i of incomingMessages) {
          messages.push(i);
        }
        setKey([]);
      };
      const socket = this.getSocket(room, username);
      socket.on('initial', initConnectionHandler);
      socket.emit('join', room);
      socket.on('message', chatHandler);
      return () => {
        socket.removeListener('message', chatHandler);
        socket.removeListener('initial', initConnectionHandler);
      };
    }, []);
    return { messages };
  }
}
