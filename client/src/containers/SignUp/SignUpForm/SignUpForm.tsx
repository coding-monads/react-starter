import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Formik, Form, Field, FormikErrors } from 'formik';
import TextHelper from '../../../components/TextHelper/TextHelper';
import TextField from '../../../components/TextField/TextField';
import Button from '../../../components/Button/Button';

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
    .required('Password repeat is required'),
});

interface ErrorsProps {
  clientErrors: FormikErrors<Values>;
  serverErrors: [{ msg: string }] | null;
}

class Error {
  msg: string;
  constructor(msg: string) {
    this.msg = msg;
  }
}

function notEmpty<Error>(value: Error | null | undefined): value is Error {
  return value !== null && value !== undefined;
}

function mapToError(value: [{ msg: string }] | null): Error[] {
  if (value == null) {
    return [] as Error[];
  } else {
    return value.map(x => new Error(x.msg))
  }
}

const Errors: React.FC<ErrorsProps> = ({ clientErrors, serverErrors }) => {
  let nonEmptyErrors: Error[] = Object.values(clientErrors)
    .filter(notEmpty)
    .map(error => new Error(error))
    .concat(mapToError(serverErrors))

  return (
    <TextHelper error component="div">
      {nonEmptyErrors.map((error, index) => (
        <p key={index} style={{ marginBottom: '5px' }}>
          -
          {' '}
          {error.msg}
        </p>
      ))}
    </TextHelper>
  )
}

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

interface Props {
  onSubmit: (values: Values) => void;
  serverErrors: [{ msg: string }] | null;
}

const SignUp: React.FC<Props> = ({ onSubmit, serverErrors }) => (
  <Formik
    validateOnBlur={false}
    validateOnChange={false}
    initialValues={
      {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordRepeat: ''
      }
    }
    onSubmit={(values) => {
      onSubmit(values);
    }}
    validationSchema={SignupSchema}
  >
    {({ errors }) => (
      <StyledFormikForm>
        <Field
          name="firstName"
          error={!!errors.firstName}
          label="First Name*"
          outllined
          component={TextField}
        />
        <Field
          name="lastName"
          error={!!errors.lastName}
          label="Last Name*"
          outllined
          component={TextField}
        />
        <Field
          name="email"
          error={!!errors.email}
          label="Email Address*"
          outllined
          component={TextField}
        />
        <Field
          name="password"
          type="password"
          error={!!errors.password}
          label="Password*"
          outllined
          component={TextField}
        />
        <Field
          name="passwordRepeat"
          type="password"
          error={!!errors.passwordRepeat}
          label="Repeat Password*"
          outllined
          component={TextField}
        />
        {
          <Errors
            clientErrors={errors}
            serverErrors={serverErrors}
          />
        }
        <Button type="submit" color="primary">
          Sign up
        </Button>
      </StyledFormikForm>
    )}
  </Formik>
);

export default SignUp;
