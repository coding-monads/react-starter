import { configure, addDecorator } from "@storybook/react";
import React from "react";
import theme from "../src/utillities/theme";
import { ThemeProvider } from "styled-components";

addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
