const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const UPDATE_USER = "UPDATE_USER";
const ADD_USER = 'ADD_USER';
const RESET_PASSWORD = "RESET_PASSWORD";
const UPDATE_PASSWORD = "UPDATE_PASSWORD";

type userMethods =
  | "REGISTER_USER"
  | "LOGIN_USER"
  | "UPDATE_USER"
  | 'ADD_USER'
  | "RESET_PASSWORD"
  | "UPDATE_PASSWORD";

export {
  REGISTER_USER,
  LOGIN_USER,
  UPDATE_USER,
  ADD_USER,
  RESET_PASSWORD,
  UPDATE_PASSWORD,
  userMethods
};