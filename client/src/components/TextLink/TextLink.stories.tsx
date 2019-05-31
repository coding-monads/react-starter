import React from 'react';
import { MemoryRouter } from 'react-router';
import { storiesOf } from '@storybook/react';

import TextLink from './TextLink';

storiesOf('TextLink', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('default', () => <TextLink to="/">Hello World</TextLink>);
