import React from 'react';
import { storiesOf } from '@storybook/react';

import TextHelper from './TextHelper';

storiesOf('TextHelper', module)
  .add('default', () => <TextHelper>Hello World</TextHelper>)
  .add('error', () => <TextHelper error>Hello World</TextHelper>);
