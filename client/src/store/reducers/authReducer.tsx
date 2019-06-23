import * as TYPES from '../actions/types';
import {
  AuthState,
  LoginActions,
  RegisterActions,
  LoadUserActions,
  LogoutAction
} from '../interfaces/authTypes';

const initState: AuthState = {
  isAuth: false,
  token: null,
  user: null,
  isLoading: false,
  errors: null
};

type AuthActions =
  | LoginActions
  | RegisterActions
  | LoadUserActions
  | LogoutAction;

export default (state = initState, action: AuthActions): AuthState => {
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
    case TYPES.USER_LOADED:
      return {
        ...state,
        isAuth: true,
        token: localStorage.getItem('token'),
        user: action.user
      };
    case TYPES.USER_LOAD_ERROR:
    case TYPES.LOGOUT:
      return {
        ...state,
        isAuth: false,
        token: null,
        user: null
      };
    default:
      return state;
  }
};
