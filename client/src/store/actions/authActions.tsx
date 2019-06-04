import * as TYPES from "./types";
import axios from "axios";
import { addAlert } from "./alertActions";

import { ThunkAction } from "redux-thunk";
import { Action } from "../interfaces/authTypes";
import { AlertActions } from "../interfaces/alertTypes";

export interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

export const loginUser = (
  loginData: LoginData
): ThunkAction<void, {}, {}, Action | AlertActions> => async dispatch => {
  dispatch({
    type: TYPES.LOGIN_LOADING
  });
  try {
    const asyncResp = await axios.post("/api/users/login", loginData);
    dispatch({
      type: TYPES.LOGIN_SUCCESS,
      token: asyncResp.data.token
    });
    dispatch(addAlert({ message: asyncResp.data.msg, variant: "success" }));
  } catch (err) {
    dispatch({
      type: TYPES.LOGIN_ERROR,
      errors: err.response.data.errors
    });
    dispatch(
      addAlert({ message: err.response.data.errors[0].msg, variant: "error" })
    );
  }
};

export const authStartLoading = () => ({ type: TYPES.LOGIN_LOADING });
