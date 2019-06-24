import { addDecorator, configure } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "../src/utillities/theme";

addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

// automatically import all files ending in *.stories.js
const req = require.context("../src/", true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
