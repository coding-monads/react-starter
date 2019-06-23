import { storiesOf } from '@storybook/react';
import React from 'react';

import SignUpForm from './SignUpForm';

storiesOf('SignUpForm', module).add('default', () => (
  <SignUpForm onSubmit={values => console.log(values)} />
));
