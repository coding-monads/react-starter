import React from "react";
import { storiesOf } from "@storybook/react";
import UpdatePassword from "./UpdatePassword";
import { MemoryRouter } from "react-router-dom";

storiesOf("UpdatePassword", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => <UpdatePassword />);
