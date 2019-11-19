import { ApolloServer } from 'apollo-server-micro';
import typeDefs from './type-defs';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/gql' });
