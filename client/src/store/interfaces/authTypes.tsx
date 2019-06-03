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

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
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

export type Action =
  | LoginSuccessAction
  | LoginErrorAction
  | LoginLoadingAction
  | RegisterSuccessAction
  | RegisterErrorAction
  | RegisterLoadingAction;
