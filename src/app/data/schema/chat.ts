import { Friendship } from "./friendship";

export class Chat {
    chatId: number;
    friendshipId: Friendship;

    constructor() {
        this.chatId = 0;
        this.friendshipId = new Friendship();
    }
}