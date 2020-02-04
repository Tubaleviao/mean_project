import { IAppState } from "../types/app.state";
import { SAVE_JWT, SAVE_USER, LOGOUT } from "../actions/app";
const user = !!localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {
      _id: "",
      username: "",
      email: "",
      location: { lat: 0, long: 0 }
    };

const initialState: IAppState = {
  user,
  jwt: localStorage.getItem("token") || ""
};

function saveJWT(state, action): IAppState {
  if (!!action.payload) localStorage.setItem("token", action.payload);
  return { ...state, jwt: action.payload };
}

function logout(): IAppState {
  localStorage.setItem("token", "");
  localStorage.setItem("user", "{}");
  return { ...initialState, jwt: "" };
}

function saveUser(state, action): IAppState {
  if (!!action.payload)
    localStorage.setItem("user", JSON.stringify(action.payload));
  return { ...state, user: action.payload };
}

export default function reducer(state: IAppState = initialState, action) {
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
