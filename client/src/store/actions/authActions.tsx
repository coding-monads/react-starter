import * as TYPES from './types';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import setAuthToken from '../../utillities/setAuthToken';
import jwtDecode from 'jwt-decode';
import { addAlert } from './alertActions';

import {
  LoginActions,
  RegisterActions,
  LoginData,
  RegisterData,
  LoadUserActions,
  LogoutAction
} from '../interfaces/authTypes';
import { AlertActions } from '../interfaces/alertTypes';

type ErrorResponse = {
  errors: string;
};

export const loginUser = (
  loginData: LoginData,
): ThunkAction<void, {}, ErrorResponse, LoginActions | AlertActions> => async dispatch => {
  dispatch({
    type: TYPES.LOGIN_LOADING
  });
  try {
    const {
      data: { token, msg }
    } = await axios.post('/api/users/login', loginData);
    setAuthToken(token);
    dispatch(setToken(token));
    await dispatch(loadUser());
    dispatch({
      type: TYPES.LOGIN_SUCCESS,
      token
    });
    dispatch(addAlert({ message: msg, variant: 'success' }));
  } catch ({ response: { data } }) {
    dispatch({
      type: TYPES.LOGIN_ERROR,
      errors: data.errors
    });
    dispatch(addAlert({ message: data.errors[0].msg, variant: 'error' }));
  }
};

export const registerUser = (
  registerData: RegisterData,
): ThunkAction<void, {}, ErrorResponse, RegisterActions | AlertActions> => dispatch => {
  dispatch({
    type: TYPES.REGISTER_LOADING
  });

  axios
    .post('/api/users/register', registerData)
    .then(({ data: { token, msg } }) => {
      setAuthToken(token);
      dispatch(setToken(token));
      dispatch(loadUser());
      dispatch({
        type: TYPES.REGISTER_SUCCESS,
        token
      });
      dispatch(addAlert({ message: msg, variant: 'success' }));
    })
    .catch(({ response: { data } }) => {
      dispatch({
        type: TYPES.REGISTER_ERROR,
        errors: data.errors
      });
      dispatch(addAlert({ message: data.errors[0].msg, variant: 'error' }));
    });
};

export const loadUser = (): ThunkAction<void, {}, {}, LoadUserActions> => async dispatch => {
  try {
    const { data } = await axios.get('/api/users');
    dispatch({
      type: TYPES.USER_LOADED,
      user: data.user
    });
  } catch (err) {
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');
    dispatch({
      type: TYPES.USER_LOAD_ERROR,
      errors: err.response.data
    });
  }
};

export const logoutUser = (): LogoutAction => {
  localStorage.removeItem('token');

  return {
    type: TYPES.LOGOUT
  };
};

const setToken = (token: string) => (dispatch: (arg: Function) => void) => {
  const decoded: { exp: number } = jwtDecode(token);
  const expTime = decoded.exp * 1000;
  localStorage.setItem('token', token);

  dispatch(checkAuthTimeout(expTime - new Date().getTime()));
};

const checkAuthTimeout = (expTime: number) => (dispatch: (arg: LogoutAction) => void) => {
  setTimeout(() => {
    dispatch(logoutUser());
  }, expTime);
};

export const checkAuth = () => (dispatch: (arg: Function | LogoutAction) => void) => {
  const token = localStorage.getItem('token');

  if (token) {
    const decoded: { exp: number } = jwtDecode(token);
    const expTime = decoded.exp * 1000;
    if (new Date() < new Date(expTime)) {
      setAuthToken(token);
      dispatch(loadUser());
      dispatch(checkAuthTimeout(expTime - new Date().getTime()));
    } else {
      dispatch(logoutUser());
    }
  }
};
