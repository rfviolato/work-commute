import React from 'react';
import { hot } from 'react-hot-loader/root';
import ApolloClient from 'apollo-boost';
import styled from '@emotion/styled';
import { ApolloProvider } from '@apollo/react-hooks';
import { Section } from './components/Section';
import { Period } from './components/Period';
import GlobalStyles from './GlobalStyles';

const client = new ApolloClient({ uri: '/gql' });

const Content = styled.section`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 4%;
  padding-top: 40px;
`;

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Content>
        <Section title="Averages">
          <Period />
        </Section>
      </Content>
      <GlobalStyles />
    </ApolloProvider>
  );
};

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
