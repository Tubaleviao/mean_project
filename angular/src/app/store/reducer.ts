import { IAppState } from "./state";
import { SAVE_JWT, SAVE_USER, LOGOUT } from "./actions";
const initialState: IAppState = {
  user: { username: "", email: "", friends: [] },
  jwt: localStorage.getItem("token") || "" //
};
// let nextId=4

function saveJWT(state, action): IAppState {
  if (!!action.payload) {
    localStorage.setItem("token", action.payload);
  }
  return Object.assign({}, state, {
    jwt: action.payload
  });
}

function logout(): IAppState {
  localStorage.setItem("token", "");
  return { ...initialState, jwt: "" };
}

function saveUser(state, action): IAppState {
  return Object.assign({}, state, {
    user: action.payload
  });
}

export function reducer(state: IAppState = initialState, action) {
  switch (action.type) {
    case SAVE_USER:
      return saveUser(state, action);
    case SAVE_JWT:
      return saveJWT(state, action);
    case LOGOUT:
      return logout();
    default:
      return state;
  }
}
