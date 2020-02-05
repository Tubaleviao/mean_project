import { IUser } from "../types/user.state";

export const SAVE_JWT = "SAVE_JWT";
export const SAVE_USER = "SAVE_USER";
export const LOGOUT = "LOGOUT";
export const NEW_FRIEND = "NEW_FRIEND";
export const BAD_FRIEND = "BAD_FRIEND"

export function saveJWT(text: String) {
  return { type: SAVE_JWT, payload: text };
}
export function saveUser(user: IUser) {
  return { type: SAVE_USER, payload: user };
}
export function logout() {
  return { type: LOGOUT };
}
export function addFriend2(friend: string){
  return { type: NEW_FRIEND, payload: friend };
}
export function removeFriend2(friend: string){
  return { type: BAD_FRIEND, payload: friend };
}