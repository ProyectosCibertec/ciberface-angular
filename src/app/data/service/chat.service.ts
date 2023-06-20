import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../schema/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) { }

  add = (chat: Chat) => {
    return this.http.post<Chat>(`${this.url}/`, chat)
  }
}
