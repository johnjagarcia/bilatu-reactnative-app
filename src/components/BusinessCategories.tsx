import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { Colors } from "../utils/colors";

export default function BusinessCategories({ data, navigation }) {
  return (
    <View style={{ marginTop: 25 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 25,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: Colors.InfoText,
            fontWeight: "bold",
          }}
        >
          Negocios
        </Text>

        <Button
          onPress={() => {
            navigation.navigate("BusinessCategories");
          }}
          title="Ver más"
          type="clear"
          titleStyle={{ color: Colors.DarkPrimary }}
          accessibilityLabel="Ver negocios por categoría"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginRight: -20, marginTop: 10 }}
      >
        {data ? (
          data.getBusinessCategories.map((c: any, index: number) => {
            const base64Icon = c.image
              ? `data:${c.image.type};base64,${c.image.data}`
              : null;

            return (
              <View
                key={index}
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  marginRight: 15,
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.DarkPrimary,
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
                    style={{
                      width: 90,
                      borderRadius: 10,
                      height: 90,
                    }}
                  />
                </View>

                <View style={{ paddingVertical: 5 }}>
                  <Text
                    style={{
                      fontSize: 10,
                      color: Colors.InfoText,
                      width: 90,
                      textAlign: "center",
                    }}
                  >
                    {c.name}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <Text>No hay nada para mostrar</Text>
        )}
      </ScrollView>
    </View>
  );
}
