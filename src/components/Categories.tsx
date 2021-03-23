import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Colors } from "../utils/colors";

export default function Categories(props: { type: string; title: string }) {
  const CATEGORIES_QUERY = gql`
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
`;

  const { data, loading, error } = useQuery(CATEGORIES_QUERY);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;

  return (
    <View style={{ marginTop: 25 }}>
      <Text
        style={{ fontSize: 32, color: Colors.InfoText, fontWeight: "bold" }}
      >
        {props.title}
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
                  padding: 5,
                }}
              >
                <Image
                  source={
                    base64Icon
                      ? { uri: base64Icon }
                      : require("../images/favicon.png")
                  }
                  style={{ width: 100, borderRadius: 10, height: 100 }}
                />
              </View>

              <View style={{ paddingHorizontal: 5, paddingVertical: 5 }}>
                <Text
                  style={{
                    fontSize: 11,
                    color: Colors.Text,
                    width: 100,
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
