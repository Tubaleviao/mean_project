export interface IUser {
  username: string;
  email: string;
  friends: string[];
  location: {lat:number, long:number};
}
