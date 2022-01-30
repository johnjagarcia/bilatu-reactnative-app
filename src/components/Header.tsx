import React from "react";
import { Header } from "react-native-elements";
import { Colors } from "../utils/colors";
import AddressPicker from "./AddressPicker";
import CartIcon from "./CartIcon";

export default function AppHeader({ navigation }) {
  return (
    <Header
      placement="left"
      leftComponent={<AddressPicker />}
      rightComponent={<CartIcon navigation={navigation} />}
      backgroundColor={Colors.DarkPrimary}
    />
  );
}
