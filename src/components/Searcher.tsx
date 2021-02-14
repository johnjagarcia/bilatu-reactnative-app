import React from "react";
import { TextInput, View } from "react-native";
import { Icon } from "react-native-elements";

export default function Searcher() {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#FFF",
        borderRadius: 40,
        marginTop: 20,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <TextInput
        placeholder="¿Que quieres búscar?"
        style={{ paddingHorizontal: 20, fontSize: 15, color: "#ccccef" }}
      />
      <Icon
        name="search"
        type="feather"
        color="#ccccef"
        style={{ marginLeft: 120 }}
      />
    </View>
  );
}
