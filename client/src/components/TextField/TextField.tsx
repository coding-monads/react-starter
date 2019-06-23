import React from 'react';
import { FieldProps } from 'formik';
import TextField from '@material-ui/core/TextField';

interface TextFieldMUITypes {
  type?: 'text' | 'password';
  label?: string;
  error?: boolean;
  outllined?: boolean;
  id: string;
}

const TextFieldMUI: React.FC<FieldProps & TextFieldMUITypes> = ({
  label = '',
  error = false,
  field,
  outllined = false,
  type = 'text',
  id
}) => {
  const variantProps = outllined
    ? { variant: 'outlined' as 'outlined' }
    : { variant: 'standard' as 'standard' };

  return <TextField {...field} type={type} label={label} error={error} {...variantProps} id={id} />;
};

export default TextFieldMUI;
