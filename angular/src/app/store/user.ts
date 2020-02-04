export interface IUser {
  _id: string;
  username: string;
  email: string;
  friends: string[];
  location: {lat:number, long:number};
}
