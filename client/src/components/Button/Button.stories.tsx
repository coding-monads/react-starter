import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ButtonMUI } from './Button';

// storiesOf('Button', module)
//   .add('default', () => (
//     <Button onClick={action('clicked')}>Hello Button</Button>
//   ))
//   .add("size='small'", () => (
//     <Button size="small" onClick={action('clicked')}>
//       Hello Button
//     </Button>
//   ))
//   .add("size='large'", () => (
//     <Button size="large" onClick={action('clicked')}>
//       Hello Button
//     </Button>
//   ))
//   .add('primary', () => (
//     <Button primary onClick={action('clicked')}>
//       Hello Button
//     </Button>
//   ));

// storiesOf('ButtonA', module).add('default', () => (
//   <ButtonA onClick={action('clicked')}>Hello Button</ButtonA>
// ));

storiesOf('ButtonMUI', module).add('default', () => (
  <ButtonMUI>
    Hello Material UI
  </ButtonMUI>
))