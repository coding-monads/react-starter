export const TEST_FIRST_DISPATCH = 'TEST_FIRST_DISPATCH';
export const TEST_SEC_DISPATCH = 'TEST_SEC_DISPATCH';

export interface initalAction {
  test: String;
  test2: String;
}

export interface Test {
  test: string;
}

interface firstTestDispatch {
  type: typeof TEST_FIRST_DISPATCH;
  payload: Test;
}
interface secTestDispatch {
  type: typeof TEST_SEC_DISPATCH;
  payload: Test;
}

export type ActionTypes = firstTestDispatch | secTestDispatch;
