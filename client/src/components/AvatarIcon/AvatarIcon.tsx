import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles({
  default: {
    margin: '10px auto'
  },
  pink: {
    margin: '10px auto',
    color: '#fff',
    backgroundColor: '#f50057'
  }
});

interface AvatarTypes {
  color?: string;
}

const AvatarIcon: React.FC<AvatarTypes> = ({
  color = 'default'
}) => {
  const classes: any = useStyles();
  return (
    <Avatar className={classes[color]}>
      <LockIcon />
    </Avatar>
  );
};

export default AvatarIcon;
