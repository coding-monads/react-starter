import React from 'react'
import { FieldProps } from 'formik';
import { TextField } from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField/TextField';


const FormTextField: React.FC<FieldProps & TextFieldProps> = ({label, error, field}) => {
    return (
        <TextField
        {...field}
        label={label}
        error={error}
        variant="outlined"
      />
    )
}

export default FormTextField
