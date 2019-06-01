import * as TYPES from "./types";
import axios from "axios";

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "../interfaces/authTypes";

export interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

export const loginUser = (
  loginData: LoginData
): ThunkAction<void, {}, {}, Action> => async dispatch => {
  dispatch({
    type: TYPES.LOGIN_LOADING
  });
  try {
    const asyncResp = await axios.post("/api/users/login", loginData);
    dispatch({
      type: TYPES.LOGIN_SUCCESS,
      token: asyncResp.data.token
    });
  } catch (err) {
    console.log(err.response.data.errors);
    dispatch({
      type: TYPES.LOGIN_ERROR,
      errors: err.response.data.errors
    });
  }
};

export const authStartLoading = () => ({ type: TYPES.LOGIN_LOADING });
