import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import SubCategoriesScreen from "./Subcategories";
import SearchResultsList from "../components/search-results/SearchResultsList";
import CategoriesScreen from "./Categories";
import BusinessCategoriesGroupScreen from "./BusinessCategories";

type RootStackParamList = {
  Home: undefined;
  Categories: undefined;
  Subcategories: undefined;
  BusinessCategories: undefined;
  SearchResults: { title: "Resultados"; subcategoryId: null; criteria: "" };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerTitle: "", headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerTitle: "Categorías" }}
          name="Categories"
          component={CategoriesScreen}
        />
        <Stack.Screen
          options={{ headerTitle: "Sub-categorías" }}
          name="Subcategories"
          component={SubCategoriesScreen}
        />
        <Stack.Screen
          options={{ headerTitle: "Categorías de negocios" }}
          name="BusinessCategories"
          component={BusinessCategoriesGroupScreen}
        />
        <Stack.Screen
          options={({ route }) => ({
            title: route.params.title,
          })}
          name="SearchResults"
          component={SearchResultsList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
