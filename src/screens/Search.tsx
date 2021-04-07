import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CategoriesGrid from "../components/CategoriesGrid";
import { Colors } from "../utils/colors";
import { Keyboard, TextInput, View } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/core";

const Tab = createMaterialTopTabNavigator();

export default function SearchScreen({ route, navigation }) {
  const [searchInputRef, setSearchInputRef] = useState<TextInput>();

  useFocusEffect(
    React.useCallback(() => {
      if (searchInputRef != null) searchInputRef.focus();
      return () => {
        Keyboard.dismiss();
      };
    }, [])
  );

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          borderRadius: 40,
          marginTop: 50,
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Icon name="search" type="feather" color={Colors.InfoText} />
        <TextInput
          ref={(ref) => ref && setSearchInputRef(ref)}
          placeholder="¿Que quieres búscar?"
          style={{
            paddingHorizontal: 20,
            fontSize: 15,
            color: Colors.InfoText,
          }}
        />
      </View>
      <Tab.Navigator
        tabBarOptions={{
          style: { marginTop: 20 },
          activeTintColor: Colors.InfoText,
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
    </View>
  );
}
