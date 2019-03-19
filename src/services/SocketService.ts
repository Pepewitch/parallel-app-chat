import SocketIOClient from 'socket.io-client';
import { Message } from '../types/Chat';

export default class SocketService {
  public static getSocket(namespace: string | string[] = '', query = {}) {
    let stringNamespace: string;
    if (namespace instanceof Array) {
      stringNamespace = namespace.join('/');
    } else {
      stringNamespace = namespace;
    }
    if (!this.socketDict[stringNamespace]) {
      this.socketDict[stringNamespace] = SocketIOClient(
        `http://localhost:80/${stringNamespace}`,
        { query },
      );
    }
    return this.socketDict[stringNamespace];
  }
  private static socketDict: {
    [namespace: string]: SocketIOClient.Socket;
  } = {};
}
