import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyles";
import theme from "./utillities/theme";
import { checkAuth } from "./store/actions/authActions";
import Alert from "./components/Alert/Alert";

import Layout from "./containers/Layout/Layout";
import LandingPage from "./containers/LandingPage";
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import ResetPassword from "./containers/ResetPassword";
import UpdatePassword from "./containers/UpdatePassword";

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
          <Alert />
          <GlobalStyle />
          <Layout>
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/login" exact component={SignIn} />
              <Route path="/register" exact component={SignUp} />
              <Route path="/password/reset" exact component={ResetPassword} />
              <Route
                path="/password/update/:token"
                exact
                component={UpdatePassword}
              />
            </Switch>
          </Layout>
        </>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default connect()(App);
