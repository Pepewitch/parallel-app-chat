import SocketIOClient from 'socket.io-client';
import { Message } from '../types/Chat';

export default class ChatService {
  public static getSocket(namespace = '') {
    if (!this.socketDict[namespace]) {
      this.socketDict[namespace] = SocketIOClient(
        `http://localhost:8080/${namespace}`,
      );
    }
    return this.socketDict[namespace];
  }
  public static send(text: string) {
    const message: Message = {
      text,
      sender: 'eiei',
      timestamp: new Date(),
    };
    this.getSocket('chat').emit('message', message);
  }
  private static socketDict: { [namespace: string]: SocketIOClient.Socket } = {};
}
