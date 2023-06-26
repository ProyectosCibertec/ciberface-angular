export class GetBasicUserInformation {
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    biography: string;
    photoUrl: string;
    friendshipsAmount: number;

    constructor() {
        this.userId = 0;
        this.firstName = "";
        this.lastName = "";
        this.userName = "";
        this.email = "";
        this.biography = "";
        this.photoUrl = "";
        this.friendshipsAmount = 0;
    }
}