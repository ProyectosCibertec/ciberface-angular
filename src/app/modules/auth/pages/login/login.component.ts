import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtRequest } from 'src/app/data/schema/jwtrequest';
import { AuthService } from 'src/app/data/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  login() {
    let req = new JwtRequest()
    req = Object.assign(req, this.loginForm.value)
    this.auth.login(req)
  }
}
