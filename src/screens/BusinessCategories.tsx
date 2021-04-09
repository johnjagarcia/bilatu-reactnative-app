import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import BusinessCategoriesTabList from "../components/BusinessCategoriesTabList";
import CategoriesGrid from "../components/CategoriesGrid";

const Stack = createStackNavigator();

export default function BusinessCategoriesGroupScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="BusinessCategories"
        children={() => <BusinessCategoriesTabList navigation={navigation} />}
      />
    </Stack.Navigator>
  );
}
