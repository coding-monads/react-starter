import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyles';
import theme from './utillities/theme';

import Layout from './containers/Layout/Layout';
import LandingPage from './containers/LandingPage';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';

const App: React.FC = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Layout>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" exact component={SignIn} />
            <Route path="/register" exact component={SignUp} />
          </Switch>
        </Layout>
      </>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
