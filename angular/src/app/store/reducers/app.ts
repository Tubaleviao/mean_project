import { IAppState } from "../types/app.state";
import { SAVE_JWT, SAVE_USER, LOGOUT, NEW_FRIEND, BAD_FRIEND } from "../actions/app";
const user = !!localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {
      _id: "",
      username: "",
      email: "",
      location: { lat: 0, long: 0 },
      friends: []
    };

const initialState: IAppState = {
  user,
  jwt: localStorage.getItem("token") || ""
};

function saveJWT(state, action): IAppState {
  if (!!action.payload) localStorage.setItem("token", action.payload);
  return { ...state, jwt: action.payload };
}

function addFriend(state, action): IAppState {
  const newState = { user: {...state.user, friends: [...state.user.friends, action.payload]}, 
                      jwt: state.jwt}
  localStorage.setItem("user", JSON.stringify(newState.user));
  return newState;
}

function removeFriend(state, action): IAppState {
  let friends = state.user.friends.slice()
  friends.splice(friends.indexOf(action.payload), 1)
  const newUser = {...state.user, friends: friends}
  const newState = { user: newUser, jwt: state.jwt}
  localStorage.setItem("user", JSON.stringify(newUser));
  return newState
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
    case NEW_FRIEND:
      return addFriend(state, action);
    case BAD_FRIEND:
      return removeFriend(state, action);
    case LOGOUT:
      return logout();
    default:
      return state;
  }
}
