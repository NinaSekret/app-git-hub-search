import { combineReducers } from "redux";
import requests from "./requests";

export const rootReducer = combineReducers({
  requests: requests
});
export type IAppState = ReturnType<typeof rootReducer>;
