import * as TYPES from '../actions/types';
import { TestAction, TestState } from '../interfaces/testTypes';

const initState: TestState = {
  test: '',
};

export default (state = initState, action: TestAction): TestState => {
  switch (action.type) {
    case TYPES.TEST_DISPATCH:
      return {
        ...state,
        test: action.payload
	    }
    default:
      return state;
  }
};
