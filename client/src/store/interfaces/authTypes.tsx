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
export type Action = LoginSuccessAction | LoginErrorAction | LoginLoadingAction;
