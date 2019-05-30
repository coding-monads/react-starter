import React from 'react'
import { FieldProps } from 'formik';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {FormControlLabelProps} from '@material-ui/core/FormControlLabel/FormControlLabel';


const FormCheckboxField: React.FC<FieldProps & FormControlLabelProps> = ({ field, label }) => {
    return (
        <FormControlLabel
        control={
          <Checkbox {...field} color="primary"/>
        }
        label={label}
      />
    )
}

export default FormCheckboxField
