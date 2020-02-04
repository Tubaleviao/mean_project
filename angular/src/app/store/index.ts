import { createStore, combineReducers } from "redux";
import app from "./reducers/app";
import friends from "./reducers/friends";

export const store = createStore(combineReducers({ app, friends }));
