import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Header from "./Header";
import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";
import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Header />
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: "#fffb0a",
          inactiveTintColor: "#fff",
          style: {
            backgroundColor: "#3e32a8",
          },
          labelStyle: { fontSize: 12 },
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "home";

            switch (route.name) {
              case "Home":
                iconName = "home";
                break;

              case "Search":
                iconName = "search";
                break;
              default:
                break;
            }

            return (
              <Icon
                name={iconName}
                type="feather"
                color={focused ? "#fffb0a" : "#fff"}
                size={32}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          options={{ title: "Inicio" }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Search"
          options={{ title: "Buscar" }}
          component={SearchScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;