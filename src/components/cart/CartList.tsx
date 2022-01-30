import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Text } from "react-native";
import { Dimensions, FlatList, View } from "react-native";
import { Icon } from "react-native-elements";
import { Colors } from "../../utils/colors";
import ListLoader from "../ListLoader";
import Cart from "./Cart";

const CartList = ({ route, navigation }) => {
  const { customerId } = route.params;

  const getCartQuery = gql`
    query {
      getCart(customerid: "${customerId}") {
        _id
        headquarter {
          _id
          name
          address
        }
        cartItems {
          _id
          quantity
          price
          total
          product {
            _id
            title
            description
            price
          }
        }
        createdAt
        updatedAt
      }
    }
  `;

  const { data, loading, refetch } = useQuery(getCartQuery);

  if (loading) return <ListLoader />;

  return (
    <>
      <FlatList
        data={data.getCart}
        renderItem={({ item }) => {
          return (
            <Cart
              key={item._id}
              headquarter={item.headquarter}
              cartItems={item.cartItems}
              navigation={navigation}
              refetchCart={refetch}
              customerId={customerId}
            />
          );
        }}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <View
            style={{
              height: Dimensions.get("window").height * 0.8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              size={32}
              name="shopping-cart"
              type="feather"
              color={Colors.DarkPrimary}
            />
            <Text
              style={{ color: Colors.InfoText, marginTop: 10, fontSize: 16 }}
            >
              No tienes productos en tu carrito
            </Text>
          </View>
        }
      />
    </>
  );
};

export default CartList;
