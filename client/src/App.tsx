import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyles";
import theme from "./utillities/theme";
import { checkAuth } from "./store/actions/authActions";
import Alert from "./components/atoms/Alert/Alert";

import MainPage from "./components/pages/MainPage/MainPage";
import LandingPage from "./components/pages/LandingPage/LandingPage";
import SignInPage from "./components/pages/SignInPage/SignInPage";
import SignUpPage from "./components/pages/SignUpPage/SignUpPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage/ResetPasswordPage";
import UpdatePassword from "./components/pages/UpdatePasswordPage/UpdatePasswordPage";

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
          <MainPage>
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/login" exact component={SignInPage} />
              <Route path="/register" exact component={SignUpPage} />
              <Route path="/password/reset" exact component={ResetPasswordPage} />
              <Route
                path="/password/update/:token"
                exact
                component={UpdatePassword}
              />
            </Switch>
          </MainPage>
        </>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default connect()(App);
