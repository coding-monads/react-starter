export interface AlertState {
  open: boolean;
  message: string;
  variant: 'info' | 'success' | 'error' | 'warning';
  autoHideDuration: number;
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

export interface AlertData {
  message: string;
  variant: 'info' | 'success' | 'error' | 'warning';
}

export interface AlertAddedAction {
  type: 'ALERT_ADDED';
  message: string;
  variant: 'info' | 'success' | 'error' | 'warning';
}
export interface AlertClearedAction {
  type: 'ALERT_CLEARED';
}

export type AlertActions = AlertAddedAction | AlertClearedAction;
