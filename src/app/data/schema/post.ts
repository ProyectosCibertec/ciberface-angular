import { Comment } from "./comment";
import { Like } from "./like";
import { User } from "./user";

export class Post {
    postId: number;
    userId: User;
    postContent: string;
    creationDate: Date;
    comments: Comment[]
    likes: number
    dislikes: number

    constructor() {
        this.postId = 0;
        this.userId = new User();
        this.postContent = "";
        this.creationDate = new Date();
        this.comments = []
        this.likes = 0;
        this.dislikes = 0;
    }
}