import { Message, InitialMessage, ReadEvent } from '../types/Chat';
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
    useEffect(() => {
      const chatHandler = (message: Message) => {
        if (message.roomId === room) {
          messages.push(message);
          setKey([]);
        }
      };
      const initHandler = (event: InitialMessage) => {
        if (event.roomId === room) {
          const { read, messages: incomingMessages } = event;
          for (const i of incomingMessages) {
            messages.push(i);
          }
          setKey([]);
        }
      };
      const connectionHandler = () => {
        socket.emit('join', room);
      };
      const socket = this.getSocket(room, username);
      socket.on('connect', connectionHandler);
      socket.on('initial', initHandler);
      socket.on('message', chatHandler);
      socket.emit('initialConnection', { roomId: room });
      return () => {
        socket.removeListener('message', chatHandler);
        socket.removeListener('initial', initHandler);
        socket.removeListener('connect', connectionHandler);
        socket.emit('leave', room);
      };
    }, []);
    return { messages };
  }
  public static useRead(username: string, room = 'global') {
    const [lastRead, setLastRead] = useState<Date>(new Date());
    useEffect(() => {
      const socket = this.getSocket(room, username);
      const updateReadHandler = (event: ReadEvent) => {
        const { roomId } = event;
        if (roomId === room && username === event.username) {
          const date = new Date(event.date);
          setLastRead(date);
        }
      };
      socket.on('updateRead', updateReadHandler);
      this.read(username, room);
      return () => {
        socket.removeListener('updateRead', updateReadHandler);
      };
    }, []);
    return lastRead;
  }
  public static read(username: string, roomId: string) {
    this.getSocket(roomId, username).emit('read', roomId);
  }
}
