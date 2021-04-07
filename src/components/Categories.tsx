import React from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Colors } from "../utils/colors";

export default function Categories({ data, navigation }) {
  const width = Dimensions.get("window").width / 3 - 20;

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        {data ? (
          data.getCategories.map((c: any, index: number) => {
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
                <View>
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
                        fontSize: 12,
                        color: Colors.InfoText,
                        textAlign: "center",
                        maxWidth: width,
                      }}
                    >
                      {c.name}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            );
          })
        ) : (
          <Text>No hay nada para mostrar</Text>
        )}
      </View>
    </ScrollView>
  );
}
