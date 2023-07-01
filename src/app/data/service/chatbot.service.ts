import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  botUrl = environment.webchatUrl;

  constructor(private http: HttpClient) { }

  getBotSamuel = () => {
    return this.http.get(this.botUrl, {
      headers: {
        "Authorization": `BotConnector ${environment.samuelToken}`,
      }
    })
  }
}
