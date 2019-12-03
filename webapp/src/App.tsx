import React from 'react';
import { hot } from 'react-hot-loader/root';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Period } from './components/Period';
import GlobalStyles from './GlobalStyles';

const client = new ApolloClient({ uri: '/gql' });

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Period />
      <GlobalStyles />
    </ApolloProvider>
  );
};

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
