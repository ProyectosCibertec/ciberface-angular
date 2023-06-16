export class JwTResponse {
    token: string;
    userId: number;

    constructor() {
        this.token = "";
        this.userId = 0;
    }
}