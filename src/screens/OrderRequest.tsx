import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CategoriesGrid from "../components/CategoriesGrid";
import OrderRequest from "../components/OrderRequest";

const Stack = createStackNavigator();

export default function OrderRequestScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="OrderRequest"
        children={() => <OrderRequest />}
      />
    </Stack.Navigator>
  );
}
