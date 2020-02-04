import { IAppState } from "./state";
import { SAVE_JWT, SAVE_USER, LOGOUT } from "./actions";

const initialState: IAppState = {
  user: JSON.parse(localStorage.getItem("user")) || { _id: "", username: "", email: "", friends: [], location: {lat:0, long:0} },
  jwt: localStorage.getItem("token") || ""
};

function saveJWT(state, action): IAppState {
  if (!!action.payload) localStorage.setItem("token", action.payload);
  return Object.assign({}, state, {
    jwt: action.payload
  });
}

function logout(): IAppState {
  localStorage.setItem("token", "");
  localStorage.setItem("user", "{}");
  return { ...initialState, jwt: "" };
}

function saveUser(state, action): IAppState {
  const newState = Object.assign({}, state, {
    user: action.payload
  });
  if (!!action.payload) localStorage.setItem("user", JSON.stringify(newState.user));
  return newState
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
