import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditUserInformation } from 'src/app/data/schema/edituserinformation';
import { GetBasicUserInformation } from 'src/app/data/schema/getbasicuserinformation';
import { AuthService } from 'src/app/data/service/auth.service';
import { UserService } from 'src/app/data/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  editProfileForm = this.fb.group({
    userName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    biography: ['', Validators.required],
    photoUrl: ['', Validators.required]
  })

  user: GetBasicUserInformation = new GetBasicUserInformation()
  editUser: EditUserInformation = new EditUserInformation()

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private userService: UserService) { }
  ngOnInit(): void {
    let userId = localStorage.getItem('logged_user_id')
    this.userService.getBasicUserInformation(parseInt(userId!)).subscribe((res) => {
      this.user = res
      this.editProfileForm.patchValue({
        userName: this.user.userName,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        biography: this.user.biography,
        photoUrl: this.user.photoUrl
      })
    })
  }

  edit() {
    this.userService.editUserInformation(this.user.userId, this.editProfileForm.value).subscribe(() => {
      this.router.navigate([''])
    })
  }

  logout() {
    this.auth.logout()
  }
}