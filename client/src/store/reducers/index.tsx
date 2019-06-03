import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { AuthState } from "../interfaces/authTypes";

export interface Store {
  auth: AuthState;
}

export default combineReducers({
  auth: authReducer,
});
