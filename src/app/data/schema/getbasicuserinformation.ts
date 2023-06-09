export class EditUserInformation {
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    biography: string;
    photoUrl: string;
    friendshipsAmount: number;

    constructor() {
        this.userId = 0;
        this.firstName = "";
        this.lastName = "";
        this.userName = "";
        this.biography = "";
        this.photoUrl = "";
        this.friendshipsAmount = 0;
    }
}