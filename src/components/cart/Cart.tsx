import React from "react";
import { Image, Text, View } from "react-native";
import { Button, Divider } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import CartItem from "../../models/cart-item";
import { Colors } from "../../utils/colors";
import ProductItem from "./ProductItem";

const Cart = ({
  headquarter,
  customerId,
  cartItems,
  navigation,
  refetchCart,
}) => {
  return (
    <View
      style={{
        marginVertical: 5,
        paddingVertical: 20,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Image
            source={require("../../images/business.png")}
            style={{ width: 50, height: 50, borderRadius: 50, padding: 25 }}
          />
        </View>

        <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            width: "75%",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: Colors.InfoText,
            }}
          >
            {headquarter.name}
          </Text>

          <View style={{ flex: 1, flexDirection: "row", paddingTop: 5 }}>
            <Text
              style={{
                fontSize: 12,
                color: Colors.DarkAccent,
              }}
            >
              {headquarter.address}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{
          marginRight: -10,
          marginTop: 10,
        }}
      >
        {cartItems.map((item: CartItem, index: number) => (
          <View key={index}>
            <ProductItem
              item={item}
              customerId={customerId}
              refetchCart={refetchCart}
            />
            <Divider />
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 10,
        }}
      >
        <Button
          title="Registrar pedido"
          titleStyle={{ color: Colors.White }}
          buttonStyle={{
            backgroundColor: Colors.DarkAccent,
            borderRadius: 40,
            minHeight: 20,
          }}
          onPress={() => navigation.navigate("OrderRequest")}
        />
      </View>
    </View>
  );
};

export default Cart;
