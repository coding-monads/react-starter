import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyles";
import theme from "./utillities/theme";
import setAuthToken from "./utillities/setAuthToken";
import { checkAuth } from "./store/actions/authActions";

import Layout from "./containers/Layout/Layout";
import Test from "./containers/Test/Test";
import SignIn from "./containers/SignIn/SignIn";

interface Props {
  dispatch: (callback: any) => void;
}

const App: React.FC<Props> = ({ dispatch }) => {
  useEffect(() => {
      dispatch(checkAuth());
  }, [dispatch]);
  return (
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
};

export default connect()(App);
