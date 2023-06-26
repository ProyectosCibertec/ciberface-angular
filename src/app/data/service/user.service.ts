import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangePassword } from '../schema/changepassword';
import { EditUserInformation } from '../schema/edituserinformation';
import { GetBasicUserInformation } from '../schema/getbasicuserinformation';
import { User } from '../schema/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  getBasicUserInformation = (userId: number) => {
    return this.http.get<GetBasicUserInformation>(`${this.url}/${userId}/get-basic-information`)
  }

  getNoFriendsByUser = (userId: number) => {
    return this.http.get<User[]>(`${this.url}/${userId}/get-no-friends`)
  }

  getFriendsByUser = (userId: number) => {
    return this.http.get<User[]>(`${this.url}/${userId}/get-friends`)
  }

  editUserInformation(userId: number, editUser: EditUserInformation) {
    return this.http.put<EditUserInformation>(`${this.url}/${userId}/edit-user-information`, editUser);
  }

  changePassword(userId: number, password: ChangePassword) {
    return this.http.put<ChangePassword>(`${this.url}/${userId}/change-password`, password);
  }
}
