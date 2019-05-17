import * as types from '../actions/types';
import { TestState, TestAction } from '../interfaces/testTypes';

const initState: TestState = {
  test: '',
};

export default (state = initState, action: TestAction): TestState => {
  switch (action.type) {
    case types.TEST_DISPATCH:
      return {
        ...state,
        test: action.payload,
      };
    default:
      return state;
  }
};
