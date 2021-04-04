import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";
import Categories from "../components/Categories";
import Promotions from "../components/Promotions";
import Searcher from "../components/Searcher";
import { Colors } from "../utils/colors";

export default function MainScreen({ navigation }) {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: Colors.Background,
      }}
    >
      <Searcher />
      <Categories title="Productos" type="PRODUCT" navigation={navigation} />
      <Categories title="Servicios" type="SERVICE" navigation={navigation} />

      <Promotions />
    </View>
  );
}
