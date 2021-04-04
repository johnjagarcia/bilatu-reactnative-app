import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Colors } from "../utils/colors";

export default function CategoriesGrid({ type, navigation }) {
  const { data, loading, error } = useQuery(gql`
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

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 10,
          marginHorizontal: 10,
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
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  marginHorizontal: 15,
                  marginVertical: 10,
                }}
              >
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
                    style={{ width: 100, borderRadius: 10, height: 100 }}
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
                      color: Colors.Text,
                      textAlign: "center",
                      maxWidth: 100,
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
