import { Chat } from "./chat";
import { User } from "./user";

export class Friendship {
    friendshipId: number;
    userId: User;
    friendId: User;
    chatId: Chat;

    constructor() {
        this.friendshipId = 0;
        this.userId = new User();
        this.friendId = new User();
        this.chatId = new Chat();
    }
}