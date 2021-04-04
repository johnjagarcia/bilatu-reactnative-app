import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Colors } from "../utils/colors";

export default function Categories({ type, title, navigation }) {
  const CATEGORIES_QUERY = gql`
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
`;

  const { data, loading, error } = useQuery(CATEGORIES_QUERY);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;

  return (
    <View style={{ marginTop: 25 }}>
      <Text
        style={{
          fontSize: 32,
          color: Colors.InfoText,
          fontWeight: "bold",
          marginLeft: 15,
        }}
      >
        {title}
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
                  marginHorizontal: 10,
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
                        : require("../images/generic.png")
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
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    </View>
  );
}
