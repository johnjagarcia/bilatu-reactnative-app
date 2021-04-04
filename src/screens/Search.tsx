import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CategoriesGrid from "../components/CategoriesGrid";
import { Colors } from "../utils/colors";
import NearProductList from "../components/NearProductList";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function SearchScreen({ route, navigation }) {
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
        children={() => (
          <CategoriesGrid type="PRODUCT" navigation={navigation} />
        )}
      />
      <Tab.Screen
        name="Servicios"
        children={() => (
          <CategoriesGrid type="SERVICE" navigation={navigation} />
        )}
      />
    </Tab.Navigator>
  );
}
