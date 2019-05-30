import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyles";
import theme from "./utillities/theme";

import Layout from "./containers/Layout/Layout";
import Test from "./containers/Test/Test";
import SignIn from "./containers/SignIn/SignIn";

const App: React.FC = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Layout>
          <Switch>
            <Route path="/" exact component={SignIn} />
          </Switch>
        </Layout>
      </>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
