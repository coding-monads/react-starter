import React from "react";
import { storiesOf } from "@storybook/react";
import UpdatePasswordPage from "./UpdatePasswordPage";
import { MemoryRouter } from "react-router-dom";

storiesOf("UpdatePassword", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => {
    const match = {
      params: {
        token: "SomeToken"
      }
    };
    return <UpdatePasswordPage match={match} />;
  });
