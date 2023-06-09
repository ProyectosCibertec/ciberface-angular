export class User {
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    biography: string;
    photoUrl: string;

    constructor() {
        this.userId = 0;
        this.firstName = "";
        this.lastName = "";
        this.userName = "";
        this.email = "";
        this.password = "";
        this.biography = "";
        this.photoUrl = "";
    }
}