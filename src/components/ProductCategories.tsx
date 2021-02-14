import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function ProductCategories() {
  const [categories, setCategories] = useState([
    "Moda",
    "Celulares",
    "Computación",
    "Belleza",
    "Educación",
  ]);
  return (
    <View style={{ marginTop: 25 }}>
      <Text style={{ fontSize: 32, color: "#1F1F1F", fontWeight: "bold" }}>
        Productos
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginRight: -20, marginTop: 30 }}
      >
        {categories.map((c, index) => {
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
                  backgroundColor: "#ccc",
                  height: 80,
                  width: 80,
                  borderRadius: 15,
                }}
              >
                <Image
                  source={require("../images/test.png")}
                  style={{ width: 80, borderRadius: 10, height: 80 }}
                />
              </View>

              <View style={{ paddingHorizontal: 5, paddingVertical: 5 }}>
                <Text style={{ fontSize: 12 }}>{c}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
