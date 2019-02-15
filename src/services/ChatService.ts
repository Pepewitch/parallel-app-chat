import SocketIOClient from 'socket.io-client';

export default class ChatService {
  public static getSocket() {
    if (this.socket) {
      return this.socket;
    }
    this.socket = SocketIOClient(this.getEndpoint());
  }
  public static getEndpoint() {
    return 'http://localhost:4001';
  }
  public static send(text: string) {
    console.log(text);
  }
  private static socket: SocketIOClient.Socket;
}
