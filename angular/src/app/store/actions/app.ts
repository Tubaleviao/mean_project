import { IUser } from "../types/user.state";

export const SAVE_JWT = "SAVE_JWT";
export const SAVE_USER = "SAVE_USER";
export const LOGOUT = "LOGOUT";

export function saveJWT(text: String) {
  return { type: SAVE_JWT, payload: text };
}
export function saveUser(user: IUser) {
  return { type: SAVE_USER, payload: user };
}
export function logout() {
  return { type: LOGOUT };
}
