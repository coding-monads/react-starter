export interface RegisterState {
  isAuth: boolean;
  token: string | null;
  user: object | null;
  isLoading: boolean;
  errors: [{ msg: string }] | null;
}

export interface RegisterData {
  firstName: string;
  lastName: string
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
export type Action = RegisterSuccessAction | RegisterErrorAction | RegisterLoadingAction;
