import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CategoriesList from "../components/CategoriesList";
import { Colors } from "../utils/colors";

const Tab = createMaterialTopTabNavigator();

export default function SearchScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.Text,
        labelStyle: { fontSize: 16, fontWeight: "bold" },
        indicatorStyle: { backgroundColor: Colors.DarkAccent },
      }}
    >
      <Tab.Screen
        name="Productos"
        children={() => <CategoriesList type="PRODUCT" />}
      />
      <Tab.Screen
        name="Servicios"
        children={() => <CategoriesList type="SERVICE" />}
      />
    </Tab.Navigator>
  );
}
