import React from 'react';
import { hot } from 'react-hot-loader/root';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { HelloWorld } from './HelloWorld';

const client = new ApolloClient({
  uri: 'http://localhost:3000/gql',
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <HelloWorld />
    </ApolloProvider>
  );
};

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
