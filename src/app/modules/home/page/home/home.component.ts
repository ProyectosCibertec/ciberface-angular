import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Chat } from 'src/app/data/schema/chat';
import { Comment } from 'src/app/data/schema/comment';
import { Friendship } from 'src/app/data/schema/friendship';
import { GetBasicUserInformation } from 'src/app/data/schema/getbasicuserinformation';
import { Like } from 'src/app/data/schema/like';
import { Post } from 'src/app/data/schema/post';
import { User } from 'src/app/data/schema/user';
import { AuthService } from 'src/app/data/service/auth.service';
import { CommentService } from 'src/app/data/service/comment.service';
import { FriendshipService } from 'src/app/data/service/friendship.service';
import { LikeService } from 'src/app/data/service/like.service';
import { PostService } from 'src/app/data/service/post.service';
import { UserService } from 'src/app/data/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: GetBasicUserInformation = new GetBasicUserInformation()
  posts: Post[] = []
  unfriendUsers: User[] = []
  
  addPostForm = this.fb.group({
    postContent: ['', Validators.required]
  });
  
  addCommentForm = this.fb.group({
    commentContent: ['', Validators.required]
  });
  
  constructor(
    private userService: UserService, 
    private postService: PostService, 
    private commentService: CommentService, 
    private likeService: LikeService, 
    private friendshipService: FriendshipService, 
    private auth: AuthService, 
    private fb: FormBuilder) { }

  ngOnInit(): void {
    let userId = localStorage.getItem('logged_user_id')
    this.userService.getBasicUserInformation(parseInt(userId!)).subscribe((res) => {
      this.user = res
    })
    this.postService.list().subscribe((res) => {
      this.posts = res
    })
    this.userService.getNoFriendsByUser(parseInt(userId!)).subscribe((res) => {
      this.unfriendUsers = res
    })
  }

  addPost(): void {
    let post = new Post()
    post = Object.assign(post, this.addPostForm.value)
    post.creationDate = new Date()
    post.userId.userId = parseInt(this.auth.getUserId() as string)
    this.postService.add(post).subscribe((res) => {
      res.userId.photoUrl = this.user.photoUrl
      res.userId.firstName = this.user.firstName
      res.comments = []
      this.posts.unshift(res)
      this.addPostForm.reset()
    })
  }

  addComment(postId: number): void {
    let comment = new Comment()
    comment = Object.assign(comment, this.addCommentForm.value)
    comment.creationDate = new Date()
    comment.userId.userId = this.user.userId
    comment.postId.postId = postId
    this.commentService.add(comment).subscribe((res) => {
      res.userId.photoUrl = this.user.photoUrl
      res.userId.firstName = this.user.firstName
      this.posts.find((post) => post.postId == postId)?.comments.unshift(res)
      this.addCommentForm.reset()
    })
  }

  addLike(postId: number): void {
    let like = new Like()
    like.likeType = 1
    like.postId.postId = postId
    like.userId.userId = this.user.userId
    this.likeService.add(like).subscribe(() => {
      let post = this.posts.find((post) => post.postId == postId)
      if (post != undefined) {
        post.likes += 1
      }
    })
  }

  addDislike(postId: number): void {
    let like = new Like()
    like.likeType = 0
    like.postId.postId = postId
    like.userId.userId = this.user.userId
    this.likeService.add(like).subscribe(() => {
      let post = this.posts.find((post) => post.postId == postId)
      if (post != undefined) {
        post.dislikes += 1
      }
    })
  }

  addFriendship(unfriendId: number): void {
    let friendship = new Friendship()
    friendship.userId.userId = this.user.userId
    friendship.friendId.userId = unfriendId
    friendship.chatId = new Chat()
    this.friendshipService.add(friendship).subscribe((res) => {
      if (res == 1) {
        this.unfriendUsers = this.unfriendUsers.filter((user) => user.userId != unfriendId)
        this.user.friendshipsAmount++
      }
    })
  }
}
