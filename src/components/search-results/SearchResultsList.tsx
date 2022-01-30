import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList, View } from "react-native";
import ListLoader from "../ListLoader";
import SearchResultItem from "./SearchResultItem";
import { Badge, FAB, Icon } from "react-native-elements";
import { Colors } from "../../utils/colors";

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
    <>
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
        keyExtractor={(item) => item._id}
      />
      <FAB
        title="Carrito"
        titleStyle={{ color: Colors.White }}
        placement="right"
        icon={
          <View>
            <Icon
              name="shopping-cart"
              type="feather"
              color={Colors.White}
              size={26}
            />

            <Badge
              value="99"
              status="success"
              containerStyle={{ position: "absolute", top: -10, right: -10 }}
            />
          </View>
        }
        buttonStyle={{
          backgroundColor: Colors.DarkAccent,
        }}
        style={{ marginBottom: 20 }}
        onPress={() =>
          navigation.navigate("CartList", {
            customerId: "6069e0c5325f750979ae2e25",
          })
        }
      />
    </>
  );
};

export default SearchResultsList;
