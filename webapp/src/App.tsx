import React from 'react';
import { hot } from 'react-hot-loader/root';
import ApolloClient from 'apollo-boost';
import styled from '@emotion/styled';
import { ApolloProvider } from '@apollo/react-hooks';
import { Section } from './components/Section';
import { Averages } from './components/Averages';
import { Today } from './components/Today';
import GlobalStyles from './GlobalStyles';

const TodaySectionContainer = styled.div`
  margin-top: 80px;
`;

const client = new ApolloClient({ uri: '/gql' });

const Content = styled.section`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 40px 4% 60px;
`;

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Content>
        <Section title="Averages">
          <Averages />
        </Section>

        <TodaySectionContainer>
          <Section title="Today">
            <Today />
          </Section>
        </TodaySectionContainer>
      </Content>
      <GlobalStyles />
    </ApolloProvider>
  );
};

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
