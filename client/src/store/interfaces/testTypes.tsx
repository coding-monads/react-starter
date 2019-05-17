export interface TestState {
  test: String;
}

export interface TestAction {
  type: string;
  payload: any;
}

export interface Test1Action {
  type: string;
  payload: string;
}

export interface Test2Action {
  type: string;
  payload: { id: number };
}
