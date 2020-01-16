import React from 'react';
import { hot } from 'react-hot-loader/root';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { ApolloProvider } from '@apollo/react-hooks';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Section } from './components/Section';
import { Period } from './components/Period';
import { Today } from './components/Today';
import { Navigation } from './components/Navigation';

import GlobalStyles from './GlobalStyles';
import { SkeletonTheme } from 'react-loading-skeleton';

const uri = '/gql';
const client = new ApolloClient({
  // link: ApolloLink.from([
  //   onError(({ graphQLErrors, networkError }) => {
  //     if (graphQLErrors)
  //       graphQLErrors.forEach(({ message, locations, path }) =>
  //         console.log(
  //           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
  //         ),
  //       );
  //     if (networkError) console.log(`[Network error]: ${networkError}`);
  //   }),
  //   new HttpLink({
  //     uri,
  //     credentials: 'same-origin',
  //   }),
  //   new BatchHttpLink({ uri }), // headers: { batch: 'true ' }
  // ]),
  link: new BatchHttpLink({ uri }),
  cache: new InMemoryCache(),
});

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
