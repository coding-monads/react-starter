import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';

interface ButtonTypes {
  children: string;
}

const ButtonMUI: React.FC<ButtonTypes & ButtonProps> = ({
  children,
  type = 'button',
  color,
}) => (
  <Button type={type} variant="contained" color={color}>
    {children}
  </Button>
);

export default ButtonMUI;
