import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native";
import ListLoader from "../ListLoader";
import SearchResultItem from "./SearchResultItem";

const SearchResultsList = ({ route, navigation }) => {
  const { subcategoryId, criteria } = route.params;

  const getProductsBySubcategory = gql`query {
    getHeadquartersWithProductsBySubcategory(subcategoryId: "${subcategoryId}"){
      _id
      name
      address
      products {
        _id
        title
        brand
        modelo
        description
        price
      }
    }
  }`;

  const getProductsByCriteria = gql`query {
    getHeadquartersWithProductsByCriteria(criteria: "${criteria}"){
      _id
      name
      address
      products {
        _id
        title
        brand
        modelo
        description
        price
      }
    }
  }`;

  const HEADQUARTERS_PRODUCTS_QUERY = subcategoryId
    ? getProductsBySubcategory
    : getProductsByCriteria;

  const { data, loading } = useQuery(HEADQUARTERS_PRODUCTS_QUERY);

  if (loading) return <ListLoader />;

  return (
    <FlatList
      data={
        subcategoryId
          ? data.getHeadquartersWithProductsBySubcategory
          : data.getHeadquartersWithProductsByCriteria
      }
      renderItem={({ item }) => {
        return (
          <SearchResultItem
            key={item._id}
            headquarter={item}
            navigation={navigation}
          />
        );
      }}
      keyExtractor={(item) => item.name}
    />
  );
};

export default SearchResultsList;
