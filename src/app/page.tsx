"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SkeletonTheme } from "react-loading-skeleton";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import styled from "@emotion/styled";
import { GlobalStyles } from "./global-styles";
import { Section } from "./components/Section";
import { Period } from "./components/Period";
import { Today } from "./components/Today";

const client = new ApolloClient({ uri: "/gql", cache: new InMemoryCache() });

const Content = styled.section`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 40px 4% 60px;

  @media (max-width: 375px) {
    padding-left: 8%;
    padding-right: 8%;
  }
`;

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <SkeletonTheme highlightColor="#b9b9b9">
        <Router>
          <Navigation />
          <Switch>
            <Content>
              <Route exact path="/">
                <Section>
                  <Today />
                </Section>
              </Route>

              <Route path="/period">
                <Section>
                  <Period />
                </Section>
              </Route>
            </Content>
          </Switch>
        </Router>
      </SkeletonTheme>
      <GlobalStyles />
    </ApolloProvider>
  );
}
