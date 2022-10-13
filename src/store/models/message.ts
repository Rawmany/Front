export interface Message {
  id: number;
  author: string;
  message: string;
  replyTo: number;
  timestamp: number;
  children?: Message[];
}
