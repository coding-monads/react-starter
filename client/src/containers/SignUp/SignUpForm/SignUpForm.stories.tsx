import React from 'react';
import { storiesOf } from '@storybook/react';

import SignUpForm from './SignUpForm';

storiesOf('SignUpForm', module)
  .add('default', () => (
    <SignUpForm serverErrors={ null } onSubmit={values => console.log(values)} />
  ))
  .add('server error', () => (
    <SignUpForm serverErrors={ [{msg: "User already registerd"}] } onSubmit={values => console.log(values)} />
  ));
