import * as TYPES from '../actions/types';
import { AlertState, AlertActions } from '../interfaces/alertTypes';

const initState: AlertState = {
  open: false,
  message: '',
  variant: 'info',
  autoHideDuration: 3000,
  vertical: 'top',
  horizontal: 'center'
};

export default (state = initState, action: AlertActions): AlertState => {
  switch (action.type) {
    case TYPES.ALERT_ADDED:
      return {
        ...state,
        open: true,
        message: action.message,
        variant: action.variant
      };
    case TYPES.ALERT_CLEARED:
      return {
        ...state,
        open: false,
        message: ''
      };
    default:
      return state;
  }
};
