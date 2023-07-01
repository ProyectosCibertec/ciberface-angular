import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../schema/message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url = `${environment.baseUrl}/api/message`;

  constructor(private http: HttpClient) { }

  getByChatId = (chatId: number) => {
    return this.http.get<Message[]>(`${this.url}/get-by-chat`, {
      params: {
        "chatId": chatId,
      }
    })
  }

  add = (message: Message) => {
    return this.http.post<Message>(`${this.url}`, message)
  }
}
