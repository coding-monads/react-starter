import * as TYPES from "../actions/types";
import { RegisterState, Action } from "../interfaces/registerTypes";

const initState: RegisterState = {
  isAuth: false,
  token: null,
  user: null,
  isLoading: false,
  errors: null
};

export default (state = initState, action: Action): RegisterState => {
  switch (action.type) {
    case TYPES.REGISTER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        token: action.token,
        isLoading: false,
        errors: null
      };
    case TYPES.REGISTER_ERROR:
      return {
        ...state,
        isAuth: false,
        token: null,
        isLoading: false,
        errors: action.errors
      };
    case TYPES.REGISTER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};
