import "react-native-gesture-handler";
import React, { useEffect } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import Navigator from "./src/screens/Navigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GRAPHQL_URI } from "@env";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
});

const wsLink = new WebSocketLink({
  uri: GRAPHQL_URI,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Headquarter: {
        fields: {
          products: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
      Cart: {
        fields: {
          cartItems: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
        merge: true,
      },
      Query: {
        fields: {
          getCart: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigator />
        </SafeAreaProvider>
      </Provider>
    </ApolloProvider>
  );
}
