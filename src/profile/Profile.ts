import { ProfileData } from "./ProfileData";

//This is the profile class to store user information
//email is not editable, it comes from the user login
export class Profile {
  public readonly userId: string;
  public firstName: string;
  public lastName: string;
  public readonly email: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(data: ProfileData) {
    this.userId = data.userId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
  }

  //Convert the Profile object to the Database object
  public toData(): ProfileData {
    return {
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
  }
}
