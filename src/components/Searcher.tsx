import React from "react";
import { TextInput, View } from "react-native";
import { Icon } from "react-native-elements";
import { Colors } from "../utils/colors";

export default function Searcher() {
  return (
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
      <Icon name="search" type="feather" color={Colors.Text} />
      <TextInput
        placeholder="¿Que quieres búscar?"
        style={{
          paddingHorizontal: 20,
          fontSize: 15,
          color: Colors.Text,
        }}
      />
    </View>
  );
}
