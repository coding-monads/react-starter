import * as TYPES from "./types";
import axios from "axios";

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "../interfaces/authTypes";

export interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
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
    dispatch({
      type: TYPES.LOGIN_ERROR,
      errors: err.response.data.errors
    });
  }
};

export const authStartLoading = () => ({ type: TYPES.LOGIN_LOADING });

export const registerUser = (
  registerData: RegisterData
): ThunkAction<void, {}, {}, Action> => async dispatch => {
  dispatch({
    type: TYPES.REGISTER_LOADING
  });

  axios
    .post("/api/users/register", registerData)
    .then(resp => {
      dispatch({
        type: TYPES.REGISTER_SUCCESS,
        token: resp.data.token
      });
    })
    .catch(err => {
      dispatch({
        type: TYPES.REGISTER_ERROR,
        errors: err.response.data.errors
      });
    });
};

export const registerStartLoading = () => ({ type: TYPES.REGISTER_LOADING });
