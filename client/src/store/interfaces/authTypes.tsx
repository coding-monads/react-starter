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
