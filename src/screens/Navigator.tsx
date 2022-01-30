import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Home";
import SubCategoriesScreen from "./Subcategories";
import SearchResultsList from "../components/search-results/SearchResultsList";
import CategoriesScreen from "./Categories";
import BusinessCategoriesGroupScreen from "./BusinessCategories";
import ProductDetail from "../components/ProductDetail";
import CartList from "../components/cart/CartList";
import OrderRequestScreen from "./OrderRequest";

type RootStackParamList = {
  Home: undefined;
  Categories: undefined;
  Subcategories: undefined;
  BusinessCategories: undefined;
  SearchResults: { title: "Resultados"; subcategoryId: null; criteria: "" };
  ProductDetail: { product: {}; headquarter: {} };
  CartList: { customerId: null };
  OrderRequest: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerTitle: "", headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerTitle: "Categorías", headerBackTitleVisible: false }}
          name="Categories"
          component={CategoriesScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: "Sub-categorías",
            headerBackTitleVisible: false,
          }}
          name="Subcategories"
          component={SubCategoriesScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: "Categorías de negocios",
            headerBackTitleVisible: false,
          }}
          name="BusinessCategories"
          component={BusinessCategoriesGroupScreen}
        />
        <Stack.Screen
          options={({ route }) => ({
            title: route.params.title,
            headerBackTitleVisible: false,
          })}
          name="SearchResults"
          component={SearchResultsList}
        />
        <Stack.Screen
          options={{
            headerTitle: "Detalle del producto",
            headerBackTitleVisible: false,
          }}
          name="ProductDetail"
          component={ProductDetail}
        />
        <Stack.Screen
          options={({ route }) => ({
            headerTitle: "Mi bolsa",
            headerBackTitleVisible: false,
          })}
          name="CartList"
          component={CartList}
        />
        <Stack.Screen
          options={{
            headerTitle: "Confirmar solicitud",
            headerBackTitleVisible: false,
          }}
          name="OrderRequest"
          component={OrderRequestScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
