import React from 'react';
import { hot } from 'react-hot-loader/root';
import ApolloClient from 'apollo-boost';
import styled from '@emotion/styled';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Section } from './components/Section';
import { Averages } from './components/Averages';
import { Today } from './components/Today';
import GlobalStyles from './GlobalStyles';

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
      <Router>
        <Switch>
          <Route exact path="/">
            <Content>
              <Section title="Today">
                <Today />
              </Section>
            </Content>
          </Route>

          <Route path="/period">
            <Content>
              <Section title="Averages">
                <Averages />
              </Section>
            </Content>
          </Route>
        </Switch>
      </Router>
      <GlobalStyles />
    </ApolloProvider>
  );
};

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
