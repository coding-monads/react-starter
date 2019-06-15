import React from "react";
import { storiesOf } from "@storybook/react";
import ResetPassword from "./ResetPassword";
import { MemoryRouter } from "react-router-dom";

storiesOf("ResetPassword", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => <ResetPassword />);
