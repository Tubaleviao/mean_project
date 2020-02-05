import { IUser } from "./user.state";

export interface IFriend {
  data: IUser[];
  error: string;
  operating: boolean;
}
