import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../schema/chat';
import { Message } from '../schema/message';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url = `${environment.baseUrl}/api/chat`;
  socket?: WebSocket;
  messages: Message[] = []

  constructor(
    private http: HttpClient, 
    private messageService: MessageService
  ) { }

  add = (chat: Chat) => {
    return this.http.post<Chat>(`${this.url}`, chat)
  }

  get = (chatId: number) => {
    return this.http.get<Chat>(`${this.url}/${chatId}`)
  }

  connect = () => {
    this.socket = new WebSocket(`${environment.baseWebSocketUrl}/websocket/chat`)

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

  getMessagesByChatId(chatId: number, refreshMessages: Function) {
    return this.messageService.getByChatId(chatId).subscribe((res) => {
      this.messages = res
      refreshMessages(this.messages)
    })
  }

  addMessage(message: Message): void {
    this.messageService.add(message).subscribe((res) => {
      this.sendMessage(res)
    })
  }
}
