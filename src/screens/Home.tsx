import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Header from "../components/Header";
import MainScreen from "./Main";
import SearchScreen from "./Search";
import { Icon } from "react-native-elements";
import { Colors } from "../utils/colors";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

const Home = ({ route, navigation }) => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Header />
      <Tab.Navigator
        initialRouteName="Main"
        tabBarOptions={{
          activeTintColor: Colors.Accent,
          inactiveTintColor: Colors.Background,
          style: {
            backgroundColor: Colors.DarkPrimary,
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
                color={focused ? Colors.Accent : Colors.Background}
                size={32}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Main"
          options={{ title: "Inicio" }}
          component={MainScreen}
        />
        <Tab.Screen
          name="Search"
          options={{ title: "Buscar" }}
          component={SearchScreen}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Home;
