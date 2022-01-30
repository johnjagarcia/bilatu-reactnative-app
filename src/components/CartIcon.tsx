import {
  gql,
  useApolloClient,
  useQuery,
  useSubscription,
} from "@apollo/client";
import React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { Badge, Icon, Button } from "react-native-elements";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getCartCount } from "../redux/modules/cart";
import { Colors } from "../utils/colors";

const CartIcon = ({ navigation }) => {
  const dispatch = useDispatch();

  const client = useApolloClient();

  const customerId = "6069e0c5325f750979ae2e25";

  useEffect(() => {
    dispatch(getCartCount(client, customerId));
  }, [dispatch]);

  const cartCount = useSelector((store: RootStateOrAny) => store.cart.count);

  const CART_SUBSCRIPTION = gql`
    subscription OnCartRefreshed($customerId: String!) {
      newCartItemQuantity(customerId: $customerId)
    }
  `;

  const { data } = useSubscription(CART_SUBSCRIPTION, {
    variables: { customerId: "6069e0c5325f750979ae2e25" },
  });

  return (
    <Button
      type="clear"
      buttonStyle={{
        marginRight: 5,
        marginTop: 5,
      }}
      icon={
        <View>
          <Icon
            name="shopping-cart"
            type="feather"
            color={Colors.White}
            size={26}
          />

          <Badge
            value={data ? data.newCartItemQuantity : cartCount}
            status="success"
            containerStyle={{ position: "absolute", top: -10, right: -10 }}
          />
        </View>
      }
      onPress={() =>
        navigation.navigate("CartList", {
          customerId: "6069e0c5325f750979ae2e25",
        })
      }
    />
  );
};

export default CartIcon;
