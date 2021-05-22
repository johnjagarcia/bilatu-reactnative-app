import React, { useEffect, useRef, useState } from "react";
import CategoriesGrid from "../components/CategoriesGrid";
import { Colors } from "../utils/colors";
import { Keyboard, Text, TextInput, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/core";

export default function SearchScreen({ route, navigation }) {
  const searchInputRef = useRef<TextInput>();
  const [showCategories, setShowCategories] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setShowCategories(false);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setShowCategories(true);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      if (searchInputRef != null) searchInputRef.current?.focus();
      return () => {
        Keyboard.dismiss();
      };
    }, [])
  );

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        paddingTop: 50,
      }}
    >
      <SearchBar
        ref={searchInputRef}
        containerStyle={{ backgroundColor: "transparent" }}
        cancelButtonTitle="Cancelar"
        cancelButtonProps={{ color: Colors.DarkPrimary }}
        platform="ios"
        placeholder="Buscar negocio o producto"
        onChangeText={(value) => setSearchText(value)}
        value={searchText}
        returnKeyType="search"
        onFocus={() => setShowCategories(false)}
        onBlur={() => setShowCategories(true)}
        onSubmitEditing={() => {
          if (searchText.length < 3) return;
          navigation.navigate("SearchResults", {
            title: searchText,
            subcategoryId: null,
            criteria: searchText,
          });
        }}
      />
      {showCategories && (
        <View>
          <Text
            style={{
              fontSize: 18,
              color: Colors.InfoText,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 45,
            }}
          >
            Categorías
          </Text>

          <CategoriesGrid type="PRODUCT" navigation={navigation} />
        </View>
      )}
    </View>
  );
}
