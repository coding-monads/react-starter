import React from "react";
import { FieldProps } from "formik";
import TextField from "@material-ui/core/TextField";

interface TextFieldMUITypes {
  label?: string;
  error?: boolean;
  outllined?: boolean;
}

const TextFieldMUI: React.FC<FieldProps & TextFieldMUITypes> = ({
  label = "",
  error = false,
  field,
  outllined = false
}) => {
  const variantProps = outllined
    ? { variant: "outlined" as "outlined" }
    : { variant: "standard" as "standard" };

  return <TextField {...field} label={label} error={error} {...variantProps} />;
};

export default TextFieldMUI;
