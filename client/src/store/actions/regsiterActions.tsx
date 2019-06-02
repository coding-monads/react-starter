import * as TYPES from "./types";
import axios from "axios";

import { ThunkAction } from "redux-thunk";
import { Action } from "../interfaces/registerTypes";

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

export const registerUser = (
  registerData: RegisterData
): ThunkAction<void, {}, {}, Action> => async dispatch => {
  dispatch({
    type: TYPES.REGISTER_LOADING
  });
  try {
    const asyncResp = await axios.post("/api/users/register", registerData);
    dispatch({
      type: TYPES.REGISTER_SUCCESS,
      token: asyncResp.data.token
    });
  } catch (err) {
    dispatch({
      type: TYPES.REGISTER_ERROR,
      errors: err.response.data.errors
    });
  }
};

export const registerStartLoading = () => ({ type: TYPES.REGISTER_LOADING });
