import { Formik, Form, Field } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Button, Checkbox, TextField, TextHelper } from '../../components';

const StyledFormikForm = styled(Form)`
  display: grid;
  grid-gap: 15px;
  width: 100%;
  max-width: 400px;
  padding: 20px 0;
`;

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password length must be at least 6 characters')
    .required('Password is required')
});

interface Values {
  email: string;
  password: string;
  remember: boolean;
}

interface Props {
  onSubmit: (values: Values) => void;
  errors: [{ msg: string }] | null;
}

const SignIn: React.FC<Props> = ({ onSubmit }) => (
  <Formik
    validateOnBlur={false}
    validateOnChange={false}
    initialValues={{ email: '', password: '', remember: false }}
    onSubmit={(values) => {
      onSubmit(values);
    }}
    validationSchema={SigninSchema}
  >
    {({ errors }) => (
      <StyledFormikForm>
        <Field
          name='email'
          error={!!errors.email}
          label='Email Address*'
          outllined
          component={TextField}
        />
        <Field
          name='password'
          type='password'
          error={!!errors.password}
          label='Password *'
          outllined
          component={TextField}
        />
        <Field
          type='checkbox'
          name='remember'
          label='Remember me'
          component={Checkbox}
        />
        {Object.keys(errors).length > 0 && (
          <TextHelper error component='div'>
            {Object.values(errors).map((error, index) => (
              <p key={index} style={{ marginBottom: '5px' }}>
                - {error}
              </p>
            ))}
          </TextHelper>
        )}
        <Button type='submit' color='primary'>
          Sign in
        </Button>
      </StyledFormikForm>
    )}
  </Formik>
);

export default SignIn;
