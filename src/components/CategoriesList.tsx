import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Colors } from "../utils/colors";

export default function CategoriesList(props: { type: string }) {
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
    <View style={{ marginTop: 25 }}>
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
                flexGrow: 1,
                width: "20%",
                height: 100,
                alignItems: "center",
                margin: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.DarkAccent,
                  borderRadius: 15,
                }}
              >
                <Image
                  source={
                    base64Icon
                      ? { uri: base64Icon }
                      : require("../images/none.png")
                  }
                  style={{ width: 80, borderRadius: 10, height: 80 }}
                />
              </View>

              <View style={{ paddingHorizontal: 5, paddingVertical: 5 }}>
                <Text
                  style={{
                    fontSize: 11,
                    color: Colors.Text,
                  }}
                >
                  {c.name}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
