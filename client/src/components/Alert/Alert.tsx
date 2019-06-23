import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { clearAlert } from '../../store/actions/alertActions';
import { Store } from '../../store/reducers';
import { AlertState } from '../../store/interfaces/alertTypes';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}));

interface AlertProps {
  alert: AlertState;
  clearAlert: () => void;
}

const Alert: React.FC<AlertProps> = ({
  alert: { open, message, variant, autoHideDuration, vertical, horizontal },
  clearAlert
}) => {
  const classes = useStyles();
  const Icon = variantIcon[variant];

  return (
    <Snackbar
      anchorOrigin={{
        vertical,
        horizontal
      }}
      open={open}
      autoHideDuration={open ? autoHideDuration : undefined}
      onClose={clearAlert}
    >
      <SnackbarContent
        className={classes[variant]}
        aria-describedby="client-snackbar"
        message={
          <span className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="Close" color="inherit" onClick={clearAlert}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
};

const mapStateToProps = (state: Store) => ({
  alert: state.alert
});

export default connect(
  mapStateToProps,
  { clearAlert },
)(Alert);
