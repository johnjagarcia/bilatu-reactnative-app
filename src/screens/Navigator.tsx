import React from "react";

import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import SubCategoriesScreen from "./Subcategories";
import NearProductList from "../components/NearProductList";

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerTitle: "Inicio", headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerTitle: "Categorías" }}
          name="Subcategories"
          component={SubCategoriesScreen}
        />
        <Stack.Screen
          options={{ headerTitle: "Cerca de mi" }}
          name="Near"
          component={NearProductList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
