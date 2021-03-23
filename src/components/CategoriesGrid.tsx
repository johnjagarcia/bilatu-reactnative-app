import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Colors } from "../utils/colors";

export default function CategoriesGrid(props: { type: string }) {
  const { data, loading, error } = useQuery(gql`
  query {
    getCategories(type: "${props.type}") {
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
        }}
      >
        {data.getCategories.map((c: any, index: number) => {
          const base64Icon = c.image
            ? `data:${c.image.type};base64,${c.image.data}`
            : null;

          return (
            <View
              key={index}
              style={{
                width: "30%",
                height: 100,
                alignItems: "flex-start",
                marginVertical: 25,
                marginHorizontal: 5,
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
                      : require("../images/favicon.png")
                  }
                  style={{ width: 110, borderRadius: 10, height: 110 }}
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
                    fontSize: 11,
                    color: Colors.Text,
                    textAlign: "center",
                  }}
                >
                  {c.name}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
