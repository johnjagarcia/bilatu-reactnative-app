import { View, Text, ImageSourcePropType } from "react-native";
import React from "react";
import { Card, Image } from "react-native-elements";
import { Colors } from "../../utils/colors";

const ShippingTypeCard = (props: {
  img: ImageSourcePropType;
  title: string;
  description: string;
  selected: boolean;
}) => {
  return (
    <Card
      containerStyle={{
        borderColor: props.selected ? Colors.DarkAccent : Colors.Background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 20,
            height: 20,
            marginRight: 10,
          }}
          resizeMode="cover"
          source={props.img}
        />

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {props.title}
          </Text>

          {/* <Text
            style={{
              fontSize: 10,
              marginTop: 5,
            }}
          >
            {props.description}
          </Text> */}
        </View>
      </View>
    </Card>
  );
};

export default ShippingTypeCard;
