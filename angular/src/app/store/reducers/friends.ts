import {
  GET_FRIENDS,
  ADD_FRIEND,
  REMOVE_FRIEND,
  GET_FRIENDS_REQUEST,
  SET_FRIENDS
} from "../actions/friends";
import { IFriend } from "../types/friend.state";

const initialState: IFriend = {
  data: [],
  error: undefined,
  operating: false
};

export default function reducer(state: IFriend = initialState, action) {
  switch (action.type) {
    case GET_FRIENDS:
      return { ...state };
    case GET_FRIENDS_REQUEST:
      return { ...state, operating: true };
    case SET_FRIENDS:
      return { ...state, operating: false, data: [...action.payload] };
    case ADD_FRIEND:
      return { ...state, data: [...state.data, action.payload] };
    case REMOVE_FRIEND:
      return { ...state };
    default:
      return state;
  }
}
