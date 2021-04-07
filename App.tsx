import "react-native-gesture-handler";
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Navigator from "./src/screens/Navigator";

const client = new ApolloClient({
  uri: "https://bilatu-express-app.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigator />
    </ApolloProvider>
  );
}
