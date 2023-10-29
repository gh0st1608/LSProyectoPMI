export default class Person {
    _id!: string;
    readonly user: string;
    readonly password: string;
    readonly refreshToken: string;

    constructor(
      user: string,
      password: string,
      refreshToken: string
    ) {
      this.user = user;
      this.password = password;
      this.refreshToken = refreshToken;
    }
 
 }
 