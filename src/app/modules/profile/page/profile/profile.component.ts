import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePassword } from 'src/app/data/schema/changepassword';
import { EditUserInformation } from 'src/app/data/schema/edituserinformation';
import { GetBasicUserInformation } from 'src/app/data/schema/getbasicuserinformation';
import { AuthService } from 'src/app/data/service/auth.service';
import { UserService } from 'src/app/data/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{
  editForm = this.fb.group({
    photoUrl: ['', Validators.required],   
    userName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    biography: ['', Validators.required],
    password: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });
  user: GetBasicUserInformation = new GetBasicUserInformation()
  editUser: EditUserInformation = new EditUserInformation()
  password: ChangePassword = new ChangePassword()

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,private userService: UserService) { }
  ngOnInit(): void {
    let userId = localStorage.getItem('logged_user_id')
    this.userService.getBasicUserInformation(parseInt(userId!)).subscribe((res) => {
      this.user = res
    })
  }

  edit(editUser: EditUserInformation) {
    let userId = localStorage.getItem('logged_user_id')
    this.userService.editUserInformation(parseInt(userId!), editUser).subscribe(
      res => this.router.navigate(['/perfil']),
      err => console.log(err)
    )
  }

  update(password: ChangePassword) {
    let userId = localStorage.getItem('logged_user_id')
    this.userService.changePassword(parseInt(userId!), password).subscribe(
      res => this.router.navigate(['/inicio']),
      err => console.log(err)
    )
  }

  logout() {
    this.auth.logout()
  }
    
}