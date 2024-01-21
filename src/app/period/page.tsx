"use client";
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GlobalStyles } from "../global-styles";
import { Period } from "../components/Period";
import { Navigation } from "../components/Navigation";
import { Content } from "../components/Content/Content.styled";

const client = new ApolloClient({ uri: "/gql", cache: new InMemoryCache() });

export default function PeriodPage() {
  return (
    <ApolloProvider client={client}>
      <Navigation />
      <Content>
        <Period />
      </Content>
      <GlobalStyles />
    </ApolloProvider>
  );
}
