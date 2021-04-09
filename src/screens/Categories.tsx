import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CategoriesGrid from "../components/CategoriesGrid";

const Stack = createStackNavigator();

export default function CategoriesScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerTitle: "Inicio", headerShown: false }}
        name="Home"
        children={() => (
          <CategoriesGrid type="PRODUCT" navigation={navigation} />
        )}
      />
    </Stack.Navigator>
  );
}
