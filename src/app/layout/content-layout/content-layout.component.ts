import { Component, OnInit } from '@angular/core';
import { GetBasicUserInformation } from 'src/app/data/schema/getbasicuserinformation';
import { AuthService } from 'src/app/data/service/auth.service';
import { UserService } from 'src/app/data/service/user.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
  user: GetBasicUserInformation = new GetBasicUserInformation()
  
  constructor(private auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    let userId = localStorage.getItem('logged_user_id')
    this.userService.getBasicUserInformation(parseInt(userId!)).subscribe((res) => {
      this.user = res
    })
  }

  logout() {
    this.auth.logout()
  }
}
