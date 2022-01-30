import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Icon, Button } from "react-native-elements";
import InputSpinner from "react-native-input-spinner";
import CartItem from "../../models/cart-item";
import { Colors } from "../../utils/colors";

const ProductItem = (props: {
  item: CartItem;
  customerId: string;
  refetchCart: Function;
}) => {
  const item: CartItem = props.item;
  const customerId = props.customerId;
  const refetchCart = props.refetchCart;

  const [amount, setAmount] = useState(item.quantity);
  const [price, setPrice] = useState(item.total);

  const [spinnerDisabled, setSpinnerDisabled] = useState(false);
  const [deletingItem, setDeletingItem] = useState(false);

  const [inputColor, setInputColor] = useState(Colors.DarkPrimary);

  const DELETE_CART_ITEM = gql`
    mutation DeleteCartItem($cartItemId: String!, $customerId: String!) {
      deleteCartItem(cart_item_id: $cartItemId, customer_id: $customerId)
    }
  `;

  const [deleteCartItem] = useMutation(DELETE_CART_ITEM);

  const deleteItem = async () => {
    setDeletingItem(true);
    await deleteCartItem({ variables: { cartItemId: item._id, customerId } });
    await refetchCart();
  };

  const UPDATE_CART_ITEM = gql`
    mutation UpdateCartItem(
      $productId: String!
      $cartItemId: String!
      $quantity: Float!
    ) {
      updateCartItem(
        quantity: $quantity
        product_id: $productId
        cart_item_id: $cartItemId
      ) {
        _id
      }
    }
  `;

  const [updateCartItem] = useMutation(UPDATE_CART_ITEM);

  const updateItem = async (quantity: number) => {
    setSpinnerDisabled(true);
    setInputColor(Colors.Background);

    await updateCartItem({
      variables: {
        productId: item.product._id,
        cartItemId: item._id,
        quantity,
      },
    });

    setAmount(quantity);
    setPrice(quantity * item.price);
    setSpinnerDisabled(false);
    setInputColor(Colors.DarkPrimary);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          borderRadius: 15,
          marginHorizontal: 10,
        }}
      >
        <Image
          source={require("../../images/generic.png")}
          style={{ width: 90, borderRadius: 10, height: 90 }}
        />
      </View>

      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "column" }}>
            <View style={{ paddingVertical: 5 }}>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 12,
                  color: Colors.InfoText,
                  fontWeight: "500",
                  width: 270,
                }}
              >
                {item.product.title}
              </Text>
            </View>
            <View style={{ paddingVertical: 2 }}>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 10,
                  color: Colors.InfoText,
                  fontWeight: "100",
                  width: 270,
                  height: 30,
                }}
              >
                {item.product.description}
              </Text>
            </View>
          </View>
          <View>
            <Button
              type="clear"
              loading={deletingItem}
              loadingProps={{ color: Colors.DarkAccent }}
              buttonStyle={{
                marginRight: 5,
                marginTop: 5,
              }}
              icon={
                <View>
                  <Icon name="trash-2" type="feather" color={Colors.Error} />
                </View>
              }
              onPress={() => deleteItem()}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: Colors.White,
          }}
        >
          <InputSpinner
            disabled={spinnerDisabled}
            height={30}
            width={100}
            max={10}
            min={1}
            step={1}
            colorMin={Colors.Error}
            colorMax={Colors.Error}
            color={inputColor}
            value={amount}
            onChange={(num: number) => updateItem(num)}
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: 18,
              color: Colors.InfoText,
              fontWeight: "bold",
              alignSelf: "flex-end",
            }}
          >
            ${price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;
