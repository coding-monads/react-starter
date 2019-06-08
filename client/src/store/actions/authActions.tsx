import * as TYPES from "./types";
import { ThunkAction } from "redux-thunk";
import axios from "axios";
import { addAlert } from "./alertActions";

import {
  LoginAction,
  RegisterAction,
  LoginData,
  RegisterData
} from "../interfaces/authTypes";
import { AlertActions } from "../interfaces/alertTypes";

type ErrorResponse = {
  errors: string
}

export const loginUser = (
  loginData: LoginData
): ThunkAction<void, {}, ErrorResponse, LoginAction | AlertActions> => async dispatch => {
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

export const registerUser = (
  registerData: RegisterData
): ThunkAction<void, {}, ErrorResponse, RegisterAction> => async dispatch => {
  dispatch({
    type: TYPES.REGISTER_LOADING
  });
  axios
    .post("/api/users/register", registerData)
    .then(({ data: { token } }) => {
      dispatch({
        type: TYPES.REGISTER_SUCCESS,
        token: token
      });
    })
    .catch(({ response: { data } }) => {
      dispatch({
        type: TYPES.REGISTER_ERROR,
        errors: data.errors
      });
    });
};
