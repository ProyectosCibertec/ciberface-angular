import { Friendship } from "./friendship";

export class Chat {
    chatId: number;
    isBlocked: number;

    constructor() {
        this.chatId = 0;
        this.isBlocked = 0;
    }
}