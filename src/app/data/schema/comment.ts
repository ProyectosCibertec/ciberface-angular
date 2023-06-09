import { Post } from "./post";
import { User } from "./user";

export class Comment {
    commentId: number;
    commentContent: string;
    postId: Post;
    userId: User;
    creationDate: Date;

    constructor() {
        this.commentId = 0;
        this.commentContent = "";
        this.postId = new Post();
        this.userId = new User();
        this.creationDate = new Date();
    }
}