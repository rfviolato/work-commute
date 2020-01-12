import React from 'react';
import { hot } from 'react-hot-loader/root';
import ApolloClient from 'apollo-boost';
import styled from '@emotion/styled';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Section } from './components/Section';
import { Period } from './components/Period';
import { Today } from './components/Today';
import { Navigation } from './components/Navigation';

import GlobalStyles from './GlobalStyles';
import { SkeletonTheme } from 'react-loading-skeleton';

const client = new ApolloClient({ uri: '/gql' });

const Content = styled.section`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 40px 4% 60px;

  @media (max-width: 375px) {
    padding-left: 8%;
    padding-right: 8%;
  }
`;

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <SkeletonTheme highlightColor="#b9b9b9">
        <Router>
          <Navigation />
          <Switch>
            <Content>
              <Route exact path="/">
                <Section>
                  <Today />
                </Section>
              </Route>

              <Route path="/period">
                <Section>
                  <Period />
                </Section>
              </Route>
            </Content>
          </Switch>
        </Router>
      </SkeletonTheme>
      <GlobalStyles />
    </ApolloProvider>
  );
};

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
