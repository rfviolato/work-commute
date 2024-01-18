"use client";
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GlobalStyles } from "../global-styles";
import { Today } from "../components/Today";
import { Navigation } from "../components/Navigation";
import { Content } from "../components/Content/Content.styled";

import "react-loading-skeleton/dist/skeleton.css";

const client = new ApolloClient({ uri: "/gql", cache: new InMemoryCache() });

export default function TodayPage() {
  return (
    <ApolloProvider client={client}>
      <Navigation />
      <Content>
        <Today />
      </Content>
      <GlobalStyles />
    </ApolloProvider>
  );
}
