import React from 'react';
import Button from '@material-ui/core/Button';
import {ButtonProps} from '@material-ui/core/Button/Button';

interface ButtonMUIProp {
  children: string;
}

export const ButtonMUI:React.FC<ButtonProps & ButtonMUIProp> = ({ children, type, color, variant }) => {
  return <Button type={type} variant={variant} color={color}>
    {children}
  </Button>
}

export const ButtonPrimaryMUI:React.FC<ButtonProps> = ({ children }) => {
  return <Button type='button' variant="contained" color="primary">
    {children}
  </Button>
}

export const ButtonFormPrimaryMUI:React.FC<ButtonProps> = ({ children }) => {
  return <Button type='submit' variant="contained" color="primary">
    {children}
  </Button>
}
