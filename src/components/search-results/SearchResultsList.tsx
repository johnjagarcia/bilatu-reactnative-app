import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native";
import ListLoader from "../ListLoader";
import SearchResultItem from "./SearchResultItem";

const SearchResultsList = ({ route }) => {
  const { subcategoryId, criteria } = route.params;

  const NEAR_PRODUCTS_QUERY = gql`
    query {
      getProducts(subcategoryid: "${subcategoryId}", criteria: "${criteria}") {
        name
        data {
          _id
          title
        }
      }
    }
  `;

  const { data, loading } = useQuery(NEAR_PRODUCTS_QUERY);

  if (loading) return <ListLoader />;

  return (
    <FlatList
      data={data.getProducts}
      renderItem={({ item }) => {
        return <SearchResultItem key={item._id} business={item} />;
      }}
      keyExtractor={(item) => item.name}
    />
  );
};

export default SearchResultsList;
