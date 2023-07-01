import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../schema/comment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url = `${environment.baseUrl}/api/comment`;

  constructor(private http: HttpClient) { }

  list = () => {
    return this.http.get<Comment[]>(`${this.url}`)
  }

  listByPostId = (postId: number) => {
    return this.http.get<Comment[]>(`${this.url}/list-by-post`, {
      params: {
        "postId": postId
      }
    })
  }

  add = (comment: Comment) => {
    return this.http.post<Comment>(`${this.url}`, comment)
  }
}
