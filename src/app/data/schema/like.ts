import { Post } from "./post";
import { User } from "./user";

export class Like {
    likeId: number;
    likeType: number;
    postId: Post;
    userId: User;

    constructor() {
        this.likeId = 0;
        this.likeType = 0;
        this.userId = new User();
        this.postId = new Post();
    }
}