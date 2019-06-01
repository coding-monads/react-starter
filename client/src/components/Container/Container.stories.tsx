import React from 'react';
import { storiesOf } from '@storybook/react';

import Container from './Container';

storiesOf('Container', module)
  .add('default', () => <Container>Hello World</Container>)
  .add('maxWidth=xs', () => <Container maxWidth="xs">Hello World</Container>);
