import { combineReducers } from "redux";
import authReducer from "./authReducer";
import registerReducer from "./registerReducer";
import { AuthState } from "../interfaces/authTypes";
import { RegisterState } from "../interfaces/registerTypes"; 

export interface Store {
  auth: AuthState;
  register: RegisterState;
}

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
});
