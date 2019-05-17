import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyles';
import theme from './utillities/theme';

import Layout from './containers/Layout/Layout';
import Test from './containers/Test/Test';

const App: React.FC = () => (
  <BrowserRouter>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Layout>
        <Switch>
          <Route path="/" exact component={Test} />
        </Switch>
      </Layout>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
