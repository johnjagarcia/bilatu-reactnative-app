import { Text, View } from "react-native";
import React, { useState } from "react";
import { Card, Image, ListItem } from "react-native-elements";
import { Colors } from "../../utils/colors";

const CurrentUserAddress = () => {
  return (
    <View>
      <Card
        containerStyle={{
          marginHorizontal: 10,
        }}
      >
        <Card.Title> Enviar a:</Card.Title>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              marginRight: 10,
            }}
            resizeMode="cover"
            source={require("../../images/location.png")}
          />

          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Casa
            </Text>

            <Text
              style={{
                fontSize: 12,
                marginTop: 5,
                color: Colors.DarkAccent,
              }}
            >
              Calle 45G #23-12 | Barranquilla, Atlántico
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default CurrentUserAddress;
