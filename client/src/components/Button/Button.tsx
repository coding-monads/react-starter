import React from 'react';
import Button from '@material-ui/core/Button';

interface ButtonTypes {
  children: string;
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const ButtonMUI: React.FC<ButtonTypes> = ({ children, type = 'button', color = 'default' }) => (
  <Button type={type} variant="contained" color={color}>
    {children}
  </Button>
);

export default ButtonMUI;
