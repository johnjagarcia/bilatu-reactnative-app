import React from "react";
import { Header } from "react-native-elements";
import { Colors } from "../utils/colors";
import AddressPicker from "./AddressPicker";

export default function AppHeader() {
  return (
    <Header
      placement="left"
      leftComponent={<AddressPicker />}
      backgroundColor={Colors.DarkPrimary}
    />
  );
}
