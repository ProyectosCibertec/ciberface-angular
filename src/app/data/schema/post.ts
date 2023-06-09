import { User } from "./user";

export class Post {
    postId: number;
    userId: User;
    postContent: string;
    creationDate: Date;

    constructor() {
        this.postId = 0;
        this.userId = new User();
        this.postContent = "";
        this.creationDate = new Date();
    }
}