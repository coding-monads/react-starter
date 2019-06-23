import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import { AuthState } from '../interfaces/authTypes';
import { AlertState } from '../interfaces/alertTypes';

export interface Store {
  auth: AuthState;
  alert: AlertState;
}

export default combineReducers({
  auth: authReducer,
  alert: alertReducer
});
