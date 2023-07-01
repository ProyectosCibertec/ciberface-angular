import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Chat } from 'src/app/data/schema/chat';
import { GetBasicUserInformation } from 'src/app/data/schema/getbasicuserinformation';
import { Message } from 'src/app/data/schema/message';
import { User } from 'src/app/data/schema/user';
import { ChatService } from 'src/app/data/service/chat.service';
import { ChatbotService } from 'src/app/data/service/chatbot.service';
import { FriendshipService } from 'src/app/data/service/friendship.service';
import { UserService } from 'src/app/data/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  user: GetBasicUserInformation = new GetBasicUserInformation()
  friendUsers: User[] = []
  messages: Message[] = this.chatService.getMessages();
  chat: Chat = new Chat()
  isSamuel: boolean = false
  samuelSrc?: SafeResourceUrl

  addMessageForm = this.fb.group({
    messageContent: ['', Validators.required]
  });
  
  constructor(
    private userService: UserService, 
    private friendshipService: FriendshipService, 
    private chatService: ChatService, 
    private chatbotService: ChatbotService, 
    private fb: FormBuilder, 
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.chatService.connect()
    let userId = localStorage.getItem('logged_user_id')
    this.userService.getBasicUserInformation(parseInt(userId!)).subscribe((res) => {
      this.user = res
    })
    this.userService.getFriendsByUser(parseInt(userId!)).subscribe((res) => {
      this.friendUsers = res
    })
    this.chatbotService.getBotSamuel().subscribe((res) => {
      this.samuelSrc = this.sanitizer.bypassSecurityTrustResourceUrl(environment.iframeWebchatUrl + res.toString())
    })
  }

  ngOnDestroy(): void {
    this.chatService.closeConnection();
  }

  getFriendship(friendId: number): void {
    this.friendshipService.getByFriendAndUserIds(this.user.userId, friendId).subscribe((res) => {
      this.getChat(res.chatId.chatId)
      this.isSamuel = false
    })
  }

  getChat(chatId: number) {
    this.chatService.get(chatId).subscribe((res) => {
      this.chat = res
      this.getMessagesByChatId(res.chatId)
    })
  }

  getMessagesByChatId(chatId: number) {
    this.chatService.getMessagesByChatId(chatId, (res: Message[]) => {
      this.messages = res
    })
  }

  addMessage(): void {
    let message = new Message()
    message = Object.assign(message, this.addMessageForm.value)
    message.creationDate = new Date()
    message.userId.userId = this.user.userId
    message.userId.photoUrl = this.user.photoUrl
    message.chatId.chatId = this.chat.chatId
    this.chatService.addMessage(message)
    this.addMessageForm.reset()
  }
}
