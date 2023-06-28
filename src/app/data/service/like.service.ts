import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Like } from '../schema/like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  url = 'http://localhost:8080/api/like';

  constructor(private http: HttpClient) { }

  add = (like: Like) => {
    return this.http.post<Like>(`${this.url}`, like)
  }
}
