import React, { useCallback, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Icon } from "react-native-elements";
import { Button } from "react-native-elements";
import InputSpinner from "react-native-input-spinner";
import Animated from "react-native-reanimated";
import { Colors } from "../utils/colors";

export default function ProductDetail({ route }) {
  const { product, headquarter } = route.params;

  const [amount, setAmount] = useState(1);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [textShown, setTextShown] = useState(false);

  const MAX_HEIGHT = 350;
  const scrollA = useRef(new Animated.Value(0)).current;

  const onTextLayout = useCallback(
    (e) => {
      console.log("e.nativeEvent.lines :>> ", e.nativeEvent.lines.length >= 2);
      if (e.nativeEvent.lines.length >= 2 && !textShown) {
        setShowMoreButton(true);
      }
    },
    [textShown]
  );

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View
          style={{
            marginTop: -1000,
            paddingTop: 1000,
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Animated.Image
            style={{
              height: MAX_HEIGHT,
              width: "200%",
              transform: [
                {
                  translateY: scrollA.interpolate({
                    inputRange: [-MAX_HEIGHT, 0, MAX_HEIGHT, MAX_HEIGHT + 1],
                    outputRange: [
                      -MAX_HEIGHT / 2,
                      0,
                      MAX_HEIGHT * 0.75,
                      MAX_HEIGHT * 0.75,
                    ],
                  }),
                },
                {
                  scale: scrollA.interpolate({
                    inputRange: [-MAX_HEIGHT, 0, MAX_HEIGHT, MAX_HEIGHT + 1],
                    outputRange: [2, 1, 0.5, 0.5],
                  }),
                },
              ],
            }}
            source={require("../images/generic.png")}
          />
        </View>
        <View style={{ padding: 24 }}>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {product.title}
          </Text>

          <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 2}
            style={{
              marginTop: 10,
              fontSize: 14,
              fontWeight: "300",
              color: Colors.InfoText,
            }}
          >
            {product.description}
          </Text>

          {showMoreButton ? (
            <Text
              onPress={() => setTextShown(!textShown)}
              style={{ color: Colors.DarkPrimary, marginTop: 5 }}
            >
              {textShown === false ? "Leer más..." : "Leer menos..."}
            </Text>
          ) : null}

          <Text
            numberOfLines={1}
            style={{
              marginTop: 15,
              fontSize: 18,
              color: Colors.InfoText,
              fontWeight: "bold",
              width: 130,
            }}
          >
            $
            {product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
          </Text>
        </View>
        <View style={{ padding: 24, backgroundColor: "#fff" }}>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Vendido por {headquarter.name}
          </Text>
          <View style={{ flex: 1, flexDirection: "row", marginTop: 5 }}>
            <Icon name="map-pin" type="feather" size={16} />
            <Text
              style={{
                fontSize: 14,
                marginLeft: 5,
              }}
            >
              {headquarter.address}
            </Text>
          </View>
        </View>

        <View
          style={{ marginTop: 20, padding: 24, backgroundColor: Colors.White }}
        >
          <View style={{ flex: 1, flexDirection: "row", marginTop: 5 }}>
            <Icon name="message-square" type="feather" size={20} />
            <Text
              style={{
                fontSize: 18,
                marginLeft: 5,
              }}
            >
              Observaciones
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              backgroundColor: Colors.Background,
              borderRadius: 40,
              padding: 10,
            }}
          >
            <TextInput
              placeholder="Desearía que..."
              multiline={true}
              maxLength={250}
              style={{
                fontSize: 14,
                color: Colors.InfoText,
                fontWeight: "200",
              }}
            />
          </View>
        </View>
      </Animated.ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: Colors.White,
          padding: 24,
        }}
      >
        <InputSpinner
          max={10}
          min={1}
          step={1}
          skin="clean"
          colorMax={"#f04048"}
          color={Colors.DarkPrimary}
          value={amount}
          onChange={(num: number) => setAmount(num)}
        />
        <Button
          title="Agregar"
          titleStyle={{ color: Colors.InfoText }}
          buttonStyle={{
            backgroundColor: Colors.DarkAccent,
            borderRadius: 40,
            minHeight: 50,
            width: 120,
          }}
        />
      </View>
    </View>
  );
}
