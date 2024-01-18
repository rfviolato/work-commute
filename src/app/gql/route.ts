import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { typeDefs } from "./type-defs";
import { createDbClient } from "./lib/db";
import { resolvers } from "./resolvers";
import { IDB } from "./types";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest, { db: IDB }>(
  server,
  {
    context: async (req) => {
      const db = await createDbClient();

      return { req, db };
    },
  }
);

export { handler as GET, handler as POST };
