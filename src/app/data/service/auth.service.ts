import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../schema/jwtrequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = 'http://localhost:8080/auth';
  userUrl = 'http://localhost:8080/api/user/';

  constructor(private http: HttpClient, private router: Router) { }

  login(login: JwtRequest) {
    return this.http.post(this.authUrl, login).subscribe((res: any) => {
      localStorage.setItem("access_token", res.token)
      localStorage.setItem("logged_user", login.username as string)
      this.router.navigate(['inicio'])
    })
  }

  register(register: any) {
    return this.http.post(this.userUrl, register)
  }

  getToken() {
    return localStorage.getItem("access_token")
  }

  logout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("logged_user")
    this.router.navigate(['/auth/login'])
  }
}
