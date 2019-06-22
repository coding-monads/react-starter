import React from 'react';
import { storiesOf } from '@storybook/react';

import TextHeading from './TextHeading';

storiesOf('TextHeading', module)
  .add('default', () => <TextHeading>Hello World</TextHeading>)
  .add('h5', () => (
    <TextHeading variant='h5'>Hello World</TextHeading>
  ))
  .add('h4', () => (
    <TextHeading variant='h4'>Hello World</TextHeading>
  ))
  .add('h3', () => (
    <TextHeading variant='h3'>Hello World</TextHeading>
  ))
  .add('h2', () => (
    <TextHeading variant='h2'>Hello World</TextHeading>
  ))
  .add('h1', () => (
    <TextHeading variant='h1'>Hello World</TextHeading>
  ));
