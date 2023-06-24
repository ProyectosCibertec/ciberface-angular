import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../schema/chat';
import { AuthService } from './auth.service';
import { Message } from '../schema/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url = 'http://localhost:8080/api/chat';
  socket?: WebSocket;
  messages: Message[] = []

  constructor(private http: HttpClient) { }

  add = (chat: Chat) => {
    return this.http.post<Chat>(`${this.url}/`, chat)
  }

  get = (chatId: number) => {
    return this.http.get<Chat>(`${this.url}/${chatId}`)
  }

  connect = () => {
    this.socket = new WebSocket('ws://localhost:8080/websocket/chat')

    this.socket.onopen = (event) => {
      console.log('Open: ', event);
    }

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messages.push(message);
    }

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event)
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message: Message): void {
    this.socket!.send(JSON.stringify(message))
  }

  closeConnection(): void {
    this.socket!.close()
  }

  getMessages(): Message[] {
    return this.messages
  }
}
