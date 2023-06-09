import { Chat } from "./chat";
import { User } from "./user";

export class Message {
    messageId: number;
    messageContent: string;
    userId: User;
    chatId: Chat;
    creationDate: Date;

    constructor() {
        this.messageId = 0;
        this.messageContent = "";
        this.userId = new User();
        this.chatId = new Chat();
        this.creationDate = new Date();
    }
}