import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyles';
import theme from './utillities/theme';

import { checkAuth } from './store/actions/authActions';
import { Alert } from './components';
import {
  MainPage,
  LandingPage,
  SignInPage,
  SignUpPage,
  ResetPasswordPage,
  UpdatePasswordPage
} from './pages';

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
              <Route path="/password/update/:token" exact component={UpdatePasswordPage} />
            </Switch>
          </MainPage>
        </>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default connect()(App);
