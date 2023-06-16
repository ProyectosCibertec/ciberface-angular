import { Injectable } from '@angular/core';
import { Post } from '../schema/post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = 'http://localhost:8080/api/post';

  constructor(private http: HttpClient) { }

  list = () => {
    return this.http.get<Post[]>(`${this.url}/`)
  }

  add = (post: Post) => {
    return this.http.post<Post>(`${this.url}/`, post)
  }
}
