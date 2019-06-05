import * as TYPES from "../actions/types";
import {
  AuthState,
  LoginActions,
  LoadUserActions
} from "../interfaces/authTypes";

const initState: AuthState = {
  isAuth: false,
  token: null,
  user: null,
  isLoading: false,
  errors: null
};

type AuthActions = LoginActions | LoadUserActions;

export default (state = initState, action: AuthActions): AuthState => {
  switch (action.type) {
    case TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        token: action.token,
        isLoading: false,
        errors: null
      };
    case TYPES.LOGIN_ERROR:
      return {
        ...state,
        isAuth: false,
        token: null,
        isLoading: false,
        errors: action.errors
      };
    case TYPES.LOGIN_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case TYPES.USER_LOADED:
      return {
        ...state,
        isAuth: true,
        token: localStorage.getItem("token"),
        user: action.user
      };
    case TYPES.USER_LOAD_ERROR:
      return {
        ...state,
        token: null
      };
    default:
      return state;
  }
};
