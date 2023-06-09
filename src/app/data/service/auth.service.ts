import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../schema/jwtrequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  login(login: JwtRequest) {
    return this.http.post(this.url, login);
  }
}
