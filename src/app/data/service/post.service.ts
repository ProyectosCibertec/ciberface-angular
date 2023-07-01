import { Injectable } from '@angular/core';
import { Post } from '../schema/post';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = `${environment.baseUrl}/api/post`;

  constructor(private http: HttpClient) { }

  list = () => {
    return this.http.get<Post[]>(`${this.url}/`)
  }

  add = (post: Post) => {
    return this.http.post<Post>(`${this.url}`, post)
  }
}
