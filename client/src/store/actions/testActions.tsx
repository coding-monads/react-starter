import * as types from './types';
import { Test1Action, Test2Action } from '../interfaces/testTypes';

export const test1Dispatch = (): Test1Action => ({
  type: types.TEST_DISPATCH,
  payload: 'Hello World',
});

export const test2Dispatch = (): Test2Action => ({
  type: types.TEST_DISPATCH,
  payload: { id: 3 },
});
