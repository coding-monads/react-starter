import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Welcome } from "@storybook/react/demo";
import { Button, ButtonA } from "../src/components/UI/Button";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("default", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("size='small'", () => (
    <Button size="small" onClick={action("clicked")}>
      Hello Button
    </Button>
  ))
  .add("size='large'", () => (
    <Button size="large" onClick={action("clicked")}>
      Hello Button
    </Button>
  ))
  .add("primary", () => (
    <Button primary onClick={action("clicked")}>
      Hello Button
    </Button>
  ));

storiesOf("ButtonA", module).add("default", () => (
  <ButtonA onClick={action("clicked")}>Hello Button</ButtonA>
));
