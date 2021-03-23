import React from "react";
import { View } from "react-native";
import Categories from "../components/Categories";
import Promotions from "../components/Promotions";
import Searcher from "../components/Searcher";
import { Colors } from "../utils/colors";

export default function HomeScreen() {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        paddingHorizontal: 20,
        backgroundColor: Colors.Background,
      }}
    >
      <Searcher />
      <Categories title="Productos" type="PRODUCT" />
      <Categories title="Servicios" type="SERVICE" />

      <Promotions />
    </View>
  );
}
