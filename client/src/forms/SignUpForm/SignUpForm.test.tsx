import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import faker from 'faker';
import 'jest-dom/extend-expect';
import React from 'react';

import SingUp from './SignUpForm';

// unmount elements after test
afterEach(cleanup);

test('correctly completed form do not produce any errors', async() => {
  // random valid sign up data
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const pass = faker.internet.password();
  const handleSubmit = jest.fn();

  const { getByLabelText, getByText, queryByText } = render(
    <SingUp onSubmit={handleSubmit} />
  );
  fireEvent.change(getByLabelText(/first./i), {
    target: { value: firstName }
  });
  fireEvent.change(getByLabelText(/last./i), {
    target: { value: lastName }
  });
  fireEvent.change(getByLabelText(/email./i), {
    target: { value: email }
  });
  fireEvent.change(getByLabelText(/^password\*/i), {
    target: { value: pass }
  });
  fireEvent.change(getByLabelText(/repeat password./i), {
    target: { value: pass }
  });

  // in material-ui implementation buttons text are in span so we first getting <span>sing up</span> and then by .parentElement proper element <button></button>
  fireEvent.click(getByText(/sign up/i).parentElement!);

  // Formik validation is async so we need to wait
  await wait();

  expect(getByLabelText('First Name*')).toHaveValue(firstName);

  // every get* function throws an error if do not find element but query* functions just return null
  expect(queryByText(/ *[A-Z]* required/i)).not.toBeInTheDocument();
  expect(handleSubmit).toBeCalledTimes(1);
});

test('not completed form produce errors', async() => {
  const handleSubmit = jest.fn();
  const { getByText, queryAllByText } = render(
    <SingUp onSubmit={handleSubmit} />
  );

  fireEvent.click(getByText(/sign up/i).parentElement!);
  await wait();
  expect(queryAllByText(/ *[A-Z]* required/i)).toMatchInlineSnapshot(`
    Array [
      <p
        style='margin-bottom: 5px;'
      >
        - 
        First name is required
      </p>,
      <p
        style='margin-bottom: 5px;'
      >
        - 
        First name is required
      </p>,
      <p
        style='margin-bottom: 5px;'
      >
        - 
        Email is required
      </p>,
      <p
        style='margin-bottom: 5px;'
      >
        - 
        Password repeat is required
      </p>,
      <p
        style='margin-bottom: 5px;'
      >
        - 
        Password is required
      </p>,
    ]
  `);
});
