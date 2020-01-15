import { ApolloServer } from 'apollo-server-micro';
import { createDbClient } from '../lib/db';
import typeDefs from './type-defs';
import resolvers from './resolvers';
import { createDataLoaders } from './data-loaders';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const db = await createDbClient();
    const dataLoaders = createDataLoaders(db);

    return { db, dataLoaders };
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
