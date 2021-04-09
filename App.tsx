import "react-native-gesture-handler";
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Navigator from "./src/screens/Navigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  //uri: "https://bilatu-express-app.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
