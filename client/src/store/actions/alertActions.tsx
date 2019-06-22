import * as TYPES from './types';
import { AlertData, AlertActions } from '../interfaces/alertTypes';

export interface CanAddAlert {
  addAlert(alert: AlertData): AlertActions;
}

export const addAlert = (alert: AlertData): AlertActions => {
  return {
    type: TYPES.ALERT_ADDED,
    message: alert.message,
    variant: alert.variant
  };
};

export const clearAlert = (): AlertActions => {
  return {
    type: TYPES.ALERT_CLEARED
  };
};
