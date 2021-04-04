import "react-native-gesture-handler";
import React from "react";
import Home from "./src/screens/Home";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Navigator from "./src/screens/Navigator";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigator />
    </ApolloProvider>
  );
}
