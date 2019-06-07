import * as TYPES from "./types";
import { ThunkAction } from "redux-thunk";
import axios from "axios";
import setAuthToken from "../../utillities/setAuthToken";

import {
  LoginActions,
  RegisterActions,
  LoginData,
  RegisterData,
  LoadUserActions
} from "../interfaces/authTypes";

type ErrorResponse = {
  errors: string
}

export const loginUser = (
  loginData: LoginData
): ThunkAction<void, {}, ErrorResponse, LoginActions> => async dispatch => {
  dispatch({
    type: TYPES.LOGIN_LOADING
  });
  try {
    const { data } = await axios.post("/api/users/login", loginData);

    if (loginData.remember) {
      localStorage.setItem("token", data.token);
      const expDate = new Date(new Date().getTime() + (data.expTime * 1000))
      localStorage.setItem("expDate", JSON.stringify(expDate));
    }
    setAuthToken(data.token);
    dispatch({
      type: TYPES.LOGIN_SUCCESS,
      token: data.token
    });
    dispatch(loadUser());
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


export const logoutUser = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expDate')

  return {
      type: TYPES.LOGOUT
  }
}

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
    dispatch({
      type: TYPES.USER_LOAD_ERROR,
      errors: err.response.data
    });
  }
};

export const checkAuthTimeout = (expTime: number): ThunkAction<
  void,
  {},
  {},
  any
> => dispatch => {
      setTimeout(() => {
          dispatch(logoutUser())
      }, expTime);
  
}

export const checkAuth = (): ThunkAction<
  void,
  {},
  {},
  any
> => dispatch => {

  const token = localStorage.getItem('token')
  const expDate = localStorage.getItem('expDate')

  if (token && expDate) {
      if(new Date() < new Date (JSON.parse(expDate))) {
        setAuthToken(localStorage.token);
        dispatch(loadUser());
        console.log(new Date(JSON.parse(expDate)).getTime() - new Date().getTime())
        dispatch(checkAuthTimeout(new Date(JSON.parse(expDate)).getTime() - new Date().getTime()));
      } else {
        dispatch(logoutUser())
      }
  }
};
