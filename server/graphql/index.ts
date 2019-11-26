import { ApolloServer } from 'apollo-server-micro';
import typeDefs from './type-defs';
import resolvers from './resolvers';
import { createDbClient } from '../lib/db';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const db = await createDbClient();

    return { db };
  },
  introspection: true,
  playground: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/gql' });
