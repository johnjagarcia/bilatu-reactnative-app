import React from "react";
import { TextInput, View } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Colors } from "../utils/colors";

export default function Searcher({ navigation }) {
  return (
    <TouchableHighlight
      onPressIn={() =>
        navigation.navigate("Search", {
          focus: true,
        })
      }
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          borderRadius: 40,
          marginTop: 20,
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Icon name="search" type="feather" color={Colors.InfoText} />
        <TextInput
          placeholder="¿Que quieres búscar?"
          style={{
            paddingHorizontal: 20,
            fontSize: 15,
            color: Colors.InfoText,
          }}
          editable={false}
        />
      </View>
    </TouchableHighlight>
  );
}
