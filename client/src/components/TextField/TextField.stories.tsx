import React from 'react';
import { Formik, Form, Field } from 'formik';
import { storiesOf } from '@storybook/react';

import TextField from './TextField';

storiesOf('TextField', module)
  .add('default', () => (
    <Formik initialValues={{ hello: '' }} onSubmit={() => {}}>
      <Form>
        <Field name='hello' label='Hello' component={TextField} />
      </Form>
    </Formik>
  ))
  .add('error', () => (
    <Formik initialValues={{ hello: '' }} onSubmit={() => {}}>
      <Form>
        <Field name='hello' error label='Hello' component={TextField} />
      </Form>
    </Formik>
  ))
  .add('outllined', () => (
    <Formik initialValues={{ hello: '' }} onSubmit={() => {}}>
      <Form>
        <Field name='hello' label='Hello' outllined component={TextField} />
      </Form>
    </Formik>
  ));
