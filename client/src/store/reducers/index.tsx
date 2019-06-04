import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from './alertReducer'
import { AuthState } from "../interfaces/authTypes";

export interface Store {
  auth: AuthState;
}

export default combineReducers({
  auth: authReducer,
  alert: alertReducer
});
