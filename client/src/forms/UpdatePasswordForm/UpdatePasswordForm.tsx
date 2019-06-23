import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Button, TextField, TextHelper } from '../../components';
import { CanAddAlert } from '../../store/actions/alertActions';

const StyledFormikForm = styled(Form)`
  display: grid;
  grid-gap: 15px;
  width: 100%;
  max-width: 400px;
  padding: 20px 0;
`;

const UpdatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password length must be at least 6 characters')
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .min(6, 'Password repeat length must be at least 6 characters')
    .required('Password repeat is required')
});

interface Props {
  token: string;
}

const UpdatePasswordForm: React.FC<Props & CanAddAlert> = ({
  token,
  addAlert
}) => (
  <Formik
    validateOnBlur={false}
    validateOnChange={false}
    initialValues={{ token, password: '', passwordConfirm: '' }}
    onSubmit={values => {
      axios
        .post('/api/users/password/update', values)
        .then(({ data }) => {
          addAlert({
            message: data.msg,
            variant: 'info'
          });
        })
        .catch(({ response: { data } }) => {
          console.log(JSON.stringify(data));
          addAlert({
            message: data.errors[0].msg,
            variant: 'error'
          });
        });
    }}
    validationSchema={UpdatePasswordSchema}
  >
    {({ errors }) => (
      <StyledFormikForm>
        <Field
          name='password'
          type='password'
          error={!!errors.password}
          label='Password*'
          outllined
          component={TextField}
        />
        <Field
          name='passwordConfirm'
          type='password'
          error={!!errors.passwordConfirm}
          label='Password Confirm*'
          outllined
          component={TextField}
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
          Update password
        </Button>
      </StyledFormikForm>
    )}
  </Formik>
);

export default UpdatePasswordForm;
