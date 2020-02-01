import {IUser} from './topic'
export interface IAppState{
    user: IUser,
    jwt: string
}