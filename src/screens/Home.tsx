import React from "react";
import { View } from "react-native";
import ProductCategories from "../components/ProductCategories";
import Searcher from "../components/Searcher";

export default function HomeScreen() {
  return (
    <View style={{ width: "100%", height: "100%", paddingHorizontal: 20 }}>
      <Searcher />
      <ProductCategories />
    </View>
  );
}
