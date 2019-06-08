export interface AuthState {
  isAuth: boolean;
  token: string | null;
  user: object | null;
  isLoading: boolean;
  errors: [{ msg: string }] | null;
}

export interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginSuccessAction {
  type: "LOGIN_SUCCESS";
  token: string;
}
export interface LoginErrorAction {
  type: "LOGIN_ERROR";
  errors: [{ msg: string }];
}
export interface LoginLoadingAction {
  type: "LOGIN_LOADING";
}

export type LoginActions =
  | LoginSuccessAction
  | LoginErrorAction
  | LoginLoadingAction;

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

export interface RegisterSuccessAction {
  type: "REGISTER_SUCCESS";
  token: string;
}
export interface RegisterErrorAction {
  type: "REGISTER_ERROR";
  errors: [{ msg: string }];
}
export interface RegisterLoadingAction {
  type: "REGISTER_LOADING";
}

export type RegisterActions =
  | RegisterSuccessAction
  | RegisterErrorAction
  | RegisterLoadingAction;


export interface UserLoadedAction {
  type: "USER_LOADED";
  user: {
    emailVerified: boolean;
    roles: [string];
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
  };
}
export interface UserLoadErrorAction {
  type: "USER_LOAD_ERROR";
}

export type LoadUserActions = UserLoadedAction | UserLoadErrorAction;

export interface LogoutAction {
  type: "LOGOUT";
}