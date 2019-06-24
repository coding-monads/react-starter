import React from 'react';
import { Formik, Form, Field } from 'formik';
import { storiesOf } from '@storybook/react';

import Checkbox from './Checkbox';

storiesOf('Checkbox', module).add('default', () => (
  <Formik initialValues={{ hello: false }} onSubmit={() => {}}>
    <Form>
      <Field type="checkbox" name="hello" label="hello" component={Checkbox} />
    </Form>
  </Formik>
));
