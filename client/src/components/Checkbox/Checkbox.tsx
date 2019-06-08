import React from 'react';
import { FieldProps } from 'formik';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface CheckboxMUITypes {
  label?: string;
}

const CheckboxMUI: React.FC<FieldProps & CheckboxMUITypes> = ({
  field,
  label,
}) => (
  <FormControlLabel
    control={<Checkbox {...field} color="primary" />}
    label={label}
  />
);

export default CheckboxMUI;
