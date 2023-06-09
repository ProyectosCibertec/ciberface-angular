import { Friendship } from "./friendship";

export class ChangePassword {
    oldPassword: string;
    newPassword: string;

    constructor() {
        this.oldPassword = "";
        this.newPassword = "";
    }
}