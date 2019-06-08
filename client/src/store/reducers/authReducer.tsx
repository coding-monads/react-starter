import * as TYPES from "../actions/types";
import { AuthState, LoginAction, RegisterAction } from "../interfaces/authTypes";

const initState: AuthState = {
  isAuth: false,
  token: null,
  user: null,
  isLoading: false,
  errors: null
};

export default (state = initState, action: LoginAction | RegisterAction): AuthState => {
  switch (action.type) {
    case TYPES.LOGIN_SUCCESS:
    case TYPES.REGISTER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        token: action.token,
        isLoading: false,
        errors: null
      };
    case TYPES.LOGIN_ERROR:
    case TYPES.REGISTER_ERROR:
      return {
        ...state,
        isAuth: false,
        token: null,
        isLoading: false,
        errors: action.errors
      };
    case TYPES.LOGIN_LOADING:
    case TYPES.REGISTER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};
