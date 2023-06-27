import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtRequest } from '../schema/jwtrequest';

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
      localStorage.setItem("logged_user_id", res.userId)
      this.router.navigate(['inicio'])
    })
  }

  register(register: any) {
    return this.http.post(this.userUrl, register)
  }

  edit(edit: any) {
    return this.http.put(this.userUrl, edit)
  }

  update(update: any) {
    return this.http.put(this.userUrl, update)
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
