import { Formik, Form, Field, FormikErrors } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Button, TextField, TextHelper } from '../../components';

const StyledFormikForm = styled(Form)`
  display: grid;
  grid-gap: 15px;
  width: 100%;
  max-width: 400px;
  padding: 20px 0;
`;

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name length must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'First name length must be at least 2 characters')
    .required('First name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password length must be at least 6 characters')
    .required('Password is required'),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .min(6, 'Password repeat length must be at least 6 characters')
    .required('Password repeat is required')
});

type ClientErrors = {
  errors: FormikErrors<Values>;
};

const FormErrors: React.FC<ClientErrors> = ({ errors }) => {
  if (Object.keys(errors).length > 0) {
    return (
      <TextHelper error component='div'>
        {Object.values(errors).map((error, index) => (
          <p key={index} style={{ marginBottom: '5px' }}>
            - {error}
          </p>
        ))}
      </TextHelper>
    );
  }
  return null;
};

export type Values = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
};

type Props = {
  onSubmit: (values: Values) => void;
};

const SignUp: React.FC<Props> = ({ onSubmit }) => (
  <Formik
    validateOnBlur={false}
    validateOnChange={false}
    initialValues={{
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordRepeat: ''
    }}
    onSubmit={values => {
      onSubmit(values);
    }}
    validationSchema={SignupSchema}
  >
    {({ errors }) => (
      <StyledFormikForm>
        <Field
          name='firstName'
          error={!!errors.firstName}
          label='First Name*'
          outllined
          component={TextField}
          id='firstName'
        />
        <Field
          name='lastName'
          error={!!errors.lastName}
          label='Last Name*'
          outllined
          component={TextField}
          id='lastName'
        />
        <Field
          name='email'
          error={!!errors.email}
          label='Email Address*'
          outllined
          component={TextField}
          id='email'
        />
        <Field
          name='password'
          type='password'
          error={!!errors.password}
          label='Password*'
          outllined
          component={TextField}
          id='password'
        />
        <Field
          name='passwordRepeat'
          type='password'
          error={!!errors.passwordRepeat}
          label='Repeat Password*'
          outllined
          component={TextField}
          id='passwordRepeat'
        />
        <FormErrors errors={errors} />
        <Button type='submit' color='primary'>
          Sign up
        </Button>
      </StyledFormikForm>
    )}
  </Formik>
);

export default SignUp;
