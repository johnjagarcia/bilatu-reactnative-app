import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Colors } from "../utils/colors";
import ListLoader from "./ListLoader";

export default function CategoriesGrid({ type, navigation }) {
  const width = Dimensions.get("window").width / 4 - 20;

  const { data, loading } = useQuery(gql`
  query {
    getCategories(type: "${type}") {
      _id
      name
      image {
        data
        type
      }
      active
      createdAt
      updatedAt
    }
  }
`);

  if (loading) return <ListLoader />;

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {data.getCategories.map((c: any, index: number) => {
          const base64Icon = c.image
            ? `data:${c.image.type};base64,${c.image.data}`
            : null;

          return (
            <TouchableHighlight
              key={index}
              onPress={() =>
                navigation.navigate("Subcategories", {
                  categoryId: c._id,
                })
              }
              underlayColor="white"
            >
              <View style={{ margin: 10 }}>
                <View
                  style={{
                    backgroundColor: Colors.DarkAccent,
                    borderRadius: 15,
                    alignSelf: "center",
                  }}
                >
                  <Image
                    source={
                      base64Icon
                        ? { uri: base64Icon }
                        : require("../images/generic.png")
                    }
                    style={{ width, borderRadius: 10, height: width }}
                  />
                </View>

                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: Colors.InfoText,
                      textAlign: "center",
                      maxWidth: width - 10,
                    }}
                  >
                    {c.name}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          );
        })}
      </View>
    </ScrollView>
  );
}
