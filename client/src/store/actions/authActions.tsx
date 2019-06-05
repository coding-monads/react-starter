import * as TYPES from "./types";
import { ThunkAction } from "redux-thunk";
import axios from "axios";

import { LoginAction, RegisterAction, LoginData, RegisterData } from "../interfaces/authTypes";

export const loginUser = (
  loginData: LoginData
): ThunkAction<void, {}, {}, LoginAction> => async dispatch => {
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

export const registerUser = (
  registerData: RegisterData
): ThunkAction<void, {}, {}, RegisterAction> => async dispatch => {
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
