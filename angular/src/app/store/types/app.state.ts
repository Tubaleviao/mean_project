import { IUser } from "./user.state";
export interface IAppState {
  user: IUser;
  jwt: string;
}
