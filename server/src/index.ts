import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    something: String
  }
`;

const resolvers = {
  Query: {
    something: (): string => {
      return 'HEY!';
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
