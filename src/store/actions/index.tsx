import {
  Test,
  ActionTypes,
  TEST_FIRST_DISPATCH,
  TEST_SEC_DISPATCH,
} from '../types';

export const firstTestDispatch = (resp: Test): ActionTypes => {
  return {
    type: TEST_FIRST_DISPATCH,
    payload: resp,
  };
};

export const secTestDispatch = (resp: Test): ActionTypes => {
  return {
    type: TEST_SEC_DISPATCH,
    payload: resp,
  };
};
