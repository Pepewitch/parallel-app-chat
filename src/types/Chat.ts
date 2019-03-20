export interface Message {
  sender: string;
  timestamp: Date;
  text: string;
  roomId: string;
}

export interface InitialMessage {
  roomId: string;
  read: Read;
  messages: Message[];
}

export interface Read {
  username: string;
  roomId: string;
  lastRead: Date;
}

export interface ReadEvent {
  roomId: string;
  date: Date;
  username: string;
}
