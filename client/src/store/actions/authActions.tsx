import * as TYPES from "./types";
import { ThunkAction } from "redux-thunk";
import axios from "axios";
import setAuthToken from "../../utillities/setAuthToken";

import {
  LoginActions,
  RegisterActions,
  LoginData,
  RegisterData,
  LoadUserActions,
  LogoutAction
} from "../interfaces/authTypes";

type ErrorResponse = {
  errors: string;
};

export const loginUser = (
  loginData: LoginData
): ThunkAction<void, {}, ErrorResponse, LoginActions> => async dispatch => {
  dispatch({
    type: TYPES.LOGIN_LOADING
  });
  try {
    const {
      data: { token, expTime }
    } = await axios.post("/api/users/login", loginData);

    setAuthToken(token);
    dispatch(setToken(token, expTime));
    await dispatch(loadUser());
    dispatch({
      type: TYPES.LOGIN_SUCCESS,
      token
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
): ThunkAction<void, {}, ErrorResponse, RegisterActions> => async dispatch => {
  dispatch({
    type: TYPES.REGISTER_LOADING
  });

  axios
    .post("/api/users/register", registerData)
    .then(({ data: { token, expTime } }) => {
      setAuthToken(token);
      dispatch(setToken(token, expTime));
      dispatch(loadUser());
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

export const loadUser = (): ThunkAction<
  void,
  {},
  {},
  LoadUserActions
> => async dispatch => {
  try {
    const { data } = await axios.get("/api/users");
    dispatch({
      type: TYPES.USER_LOADED,
      user: data.user
    });
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("expDate");
    dispatch({
      type: TYPES.USER_LOAD_ERROR,
      errors: err.response.data
    });
  }
};

export const logoutUser = (): LogoutAction => {
  localStorage.removeItem("token");
  localStorage.removeItem("expDate");

  return {
    type: TYPES.LOGOUT
  };
};

const setToken = (token: string, expTime: number) => (
  dispatch: (arg: Function) => void
) => {
  localStorage.setItem("token", token);
  const expDate = new Date(new Date().getTime() + expTime * 1000);
  localStorage.setItem("expDate", JSON.stringify(expDate));

  dispatch(checkAuthTimeout(expDate.getTime() - new Date().getTime()));
};

const checkAuthTimeout = (expTime: number) => (
  dispatch: (arg: LogoutAction) => void
) => {
  setTimeout(() => {
    dispatch(logoutUser());
  }, expTime);
};

export const checkAuth = () => (
  dispatch: (arg: Function | LogoutAction) => void
) => {
  const token = localStorage.getItem("token");
  const expDate = localStorage.getItem("expDate");

  if (token && expDate) {
    if (new Date() < new Date(JSON.parse(expDate))) {
      setAuthToken(token);
      dispatch(loadUser());
      dispatch(
        checkAuthTimeout(
          new Date(JSON.parse(expDate)).getTime() - new Date().getTime()
        )
      );
    } else {
      dispatch(logoutUser());
    }
  }
};
