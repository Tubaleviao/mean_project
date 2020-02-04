import { IAppState } from "./state";
import { SAVE_JWT, SAVE_USER, LOGOUT } from "./actions";
const storedUser = localStorage.getItem("user");
const initialState: IAppState = {
  user: !!storedUser
    ? JSON.parse(storedUser)
    : {
        _id: "",
        username: "",
        email: "",
        friends: [],
        location: { lat: 0, long: 0 }
      },
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
  if (!!action.payload)
    localStorage.setItem("user", JSON.stringify(action.payload));
  return { ...state, user: action.payload };
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
