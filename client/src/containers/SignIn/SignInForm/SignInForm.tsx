import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import FormTextField from "../../../components/FormTextField/FormTextField";
import * as Yup from 'yup';
import { ButtonFormPrimaryMUI } from "../../../components/Button/Button";
import FormCheckboxField from "../../../components/FormCheckboxField/FormCheckboxField";

const StyledFormikForm = styled(Form)`
    display: grid;
    grid-gap: 15px;
    width: 100%;
    max-width: 400px;
    padding: 0 20px;
`

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
    password: Yup.string()
    .min(6, 'Password length must be at least 6 characters')
    .required('Password is required'),
});

interface Values {
  email: string;
  password: string;
  remember: boolean;
}

interface Props {
  onSubmit: (values: Values) => void;
}

const SignIn: React.FC<Props> = ({onSubmit}) => {
  return (
 
      <Formik
      validateOnBlur={false}
      validateOnChange={false}
        initialValues={{ email: "", password: "", remember: false }}
        onSubmit={values => {
            onSubmit(values)
        }}
        validationSchema={SigninSchema}
      >
        {({ errors }) => (
          <StyledFormikForm>
            <Field name="email" error={errors.email} label="Email *" component={FormTextField}/>
            <Field name="password" error={errors.password} label="Password *" component={FormTextField}/>
            <Field type="checkbox" name="remember" label="Remember me" component={FormCheckboxField}/>
            {Object.keys(errors).length > 0 && <FormHelperText error>{Object.values(errors).map(error => <p>{error}</p>)}</FormHelperText>}
            <ButtonFormPrimaryMUI>Submit</ButtonFormPrimaryMUI>
          </StyledFormikForm>
        )}
      </Formik>
  );
};

export default SignIn;
