export interface IUser {
  _id: string;
  username: string;
  email: string;
  location: { lat: number; long: number };
}
