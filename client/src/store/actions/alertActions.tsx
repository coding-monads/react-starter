import * as TYPES from "./types";
import { AlertData, AlertActions } from "../interfaces/alertTypes";

export const addAlert = (alert: AlertData): AlertActions => {
  return {
    type: TYPES.ALERT_ADDED,
    message: alert.message,
    variant: alert.variant
  };
};

export function clearAlert() {
  return {
    type: TYPES.ALERT_CLEARED
  };
}
