import * as TYPES from "./types";
import axios from "axios";
import setAuthToken from "../../utillities/setAuthToken";

import { ThunkAction } from "redux-thunk";
import {
  LoginData,
  LoginActions,
  LoadUserActions
} from "../interfaces/authTypes";

export const loginUser = (
  loginData: LoginData
): ThunkAction<void, {}, {}, LoginActions> => async dispatch => {
  dispatch({
    type: TYPES.LOGIN_LOADING
  });
  try {
    const asyncResp = await axios.post("/api/users/login", loginData);

    if (loginData.remember) {
      localStorage.setItem("token", asyncResp.data.token);
    }
    setAuthToken(asyncResp.data.token);
    dispatch({
      type: TYPES.LOGIN_SUCCESS,
      token: asyncResp.data.token
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: TYPES.LOGIN_ERROR,
      errors: err.response.data.errors
    });
  }
};

export const loadUser = (): ThunkAction<
  void,
  {},
  {},
  LoadUserActions
> => async dispatch => {
  try {
    const asyncResp = await axios.get("/api/users");
    dispatch({
      type: TYPES.USER_LOADED,
      user: asyncResp.data
    });
  } catch (err) {
    localStorage.removeItem("token");
    dispatch({
      type: TYPES.USER_LOAD_ERROR,
      errors: err.response.data
    });
  }
};
