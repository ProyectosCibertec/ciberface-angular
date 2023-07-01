import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../schema/jwtrequest';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = `${environment.baseUrl}/auth`;
  userUrl = `${environment.baseUrl}/api/user`;

  constructor(private http: HttpClient, private router: Router) { }

  login(login: JwtRequest) {
    return this.http.post(this.authUrl, login).subscribe((res: any) => {
      localStorage.setItem("access_token", res.token)
      localStorage.setItem("logged_user_id", res.userId)
      this.router.navigate(['inicio'])
    })
  }

  register(register: any) {
    return this.http.post(this.userUrl, register)
  }

  getToken() {
    return localStorage.getItem("access_token")
  }

  getUserId() {
    return localStorage.getItem("logged_user_id")
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/auth/login'])
  }
}
