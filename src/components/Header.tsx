import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";
import AddressPicker from "./AddressPicker";

export default function AppHeader() {
  return (
    <Header
      placement="left"
      leftComponent={<AddressPicker />}
      backgroundColor="#3e32a8"
    />
  );
}
