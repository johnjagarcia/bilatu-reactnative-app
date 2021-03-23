import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Colors } from "../utils/colors";

export default function Promotions() {
  const CATEGORIES_QUERY = gql`
    query {
      getCategories(type: "PRODUCT") {
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
  `;

  const { data, loading, error } = useQuery(CATEGORIES_QUERY);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;

  return (
    <View style={{ marginTop: 25 }}>
      <Text
        style={{ fontSize: 26, color: Colors.InfoText, fontWeight: "bold" }}
      >
        Promos cerca de ti
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginRight: -20, marginTop: 10 }}
      >
        {data.getCategories.map((c: any, index: number) => {
          const base64Icon = c.image
            ? `data:${c.image.type};base64,${c.image.data}`
            : null;

          return (
            <View
              key={index}
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginRight: 20,
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
                      : require("../images/favicon.png")
                  }
                  style={{ width: 70, borderRadius: 10, height: 70 }}
                />
              </View>

              <View style={{ paddingHorizontal: 5, paddingVertical: 5 }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: Colors.Text,
                    width: 70,
                    textAlign: "center",
                  }}
                >
                  {c.name}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
