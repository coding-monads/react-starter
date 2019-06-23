import React from 'react';
import { storiesOf } from '@storybook/react';

import { IconAvatarLock } from './AvatarIcon';

storiesOf('AvatarIconLock', module)
  .add('default', () => <IconAvatarLock />)
  .add('pink', () => <IconAvatarLock color='pink' />);
