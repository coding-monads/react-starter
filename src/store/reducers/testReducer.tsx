import {
  initalAction,
  ActionTypes,
  TEST_FIRST_DISPATCH,
  TEST_SEC_DISPATCH,
} from '../types';

const initState: initalAction = {
  test: '',
  test2: '',
};

export default (state = initState, action: ActionTypes): initalAction => {
  switch (action.type) {
    case TEST_FIRST_DISPATCH:
      return {
        ...state,
        ...action.payload,
      };
    case TEST_SEC_DISPATCH:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
