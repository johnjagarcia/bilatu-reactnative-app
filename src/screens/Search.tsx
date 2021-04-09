import React, { useEffect, useState } from "react";
import CategoriesGrid from "../components/CategoriesGrid";
import { Colors } from "../utils/colors";
import { Keyboard, Platform, Text, TextInput, View } from "react-native";
import { Icon, SearchBar } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/core";

export default function SearchScreen({ route, navigation }) {
  const [searchInputRef, setSearchInputRef] = useState<SearchBar>();
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
      if (searchInputRef != null) searchInputRef.focus();
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
      {/* <View
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
          onChangeText={(text) => setSearchText(text)}
          defaultValue={searchText}
          style={{
            paddingHorizontal: 20,
            fontSize: 15,
            color: Colors.InfoText,
          }}
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
      </View> */}
      <SearchBar
        ref={(ref) => ref && setSearchInputRef(ref)}
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
