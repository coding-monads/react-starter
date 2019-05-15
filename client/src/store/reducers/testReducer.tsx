import * as types from '../actions/types';
import { TestState, TestAction } from '../types/testTypes';

const initState: TestState = {
  test: '',
};

export default (state = initState, action: TestAction) => {
  switch (action.type) {
    case types.TEST_DISPATCH:
      return {
        ...state,
      };
    default:
      return state;
  }
};
