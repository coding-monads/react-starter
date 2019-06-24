import { storiesOf } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import UpdatePasswordPage from './UpdatePasswordPage';

storiesOf('UpdatePasswordPage', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('default', () => {
    const match = {
      params: {
        token: 'SomeToken'
      }
    };
    return <UpdatePasswordPage match={match} />;
  });
