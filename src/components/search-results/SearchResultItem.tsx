import React from "react";
import { Image, Text, View } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { Colors } from "../../utils/colors";

const SearchResultItem = ({ headquarter, navigation }) => (
  <View
    style={{
      marginVertical: 5,
      paddingVertical: 20,
      backgroundColor: "#fff",
    }}
  >
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View
        style={{
          marginLeft: 10,
        }}
      >
        <Image
          source={require("../../images/business.png")}
          style={{ width: 50, borderRadius: 50, height: 50, padding: 25 }}
        />
      </View>

      <View
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: Colors.InfoText,
          }}
        >
          {headquarter.name}
        </Text>

        <View style={{ flex: 1, flexDirection: "row", paddingTop: 5 }}>
          <Text
            style={{
              fontSize: 12,
              color: Colors.DarkAccent,
            }}
          >
            {headquarter.address}
          </Text>
        </View>
      </View>
    </View>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        marginRight: -20,
        marginTop: 10,
      }}
    >
      {headquarter.products.map(
        (
          product: {
            _id: string;
            title: string;
            description: string;
            price: number;
          },
          index: number
        ) => (
          <TouchableHighlight
            key={index}
            onPress={() =>
              navigation.navigate("ProductDetail", {
                product,
                headquarter,
              })
            }
            underlayColor="white"
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                margin: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.DarkAccent,
                  borderRadius: 15,
                }}
              >
                <Image
                  source={require("../../images/generic.png")}
                  style={{ width: 130, borderRadius: 10, height: 130 }}
                />
              </View>

              <View style={{ paddingVertical: 5 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 12,
                    color: Colors.InfoText,
                    fontWeight: "500",
                    width: 130,
                  }}
                >
                  {product.title}
                </Text>
              </View>
              <View style={{ paddingVertical: 2 }}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 10,
                    color: Colors.InfoText,
                    fontWeight: "100",
                    width: 130,
                  }}
                >
                  {product.description}
                </Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    color: Colors.InfoText,
                    fontWeight: "bold",
                    width: 130,
                  }}
                >
                  $
                  {product.price
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                </Text>

                {/* <View style={{ paddingTop: 10 }}>
                <Button
                  title="Agregar"
                  type="outline"
                  titleStyle={{ color: Colors.DarkPrimary }}
                  buttonStyle={{
                    borderColor: Colors.DarkPrimary,
                  }}
                  onPress={() =>
                    navigation.navigate("ProductDetail", {
                      product,
                      headquarter,
                    })
                  }
                />
              </View> */}
              </View>
            </View>
          </TouchableHighlight>
        )
      )}
    </ScrollView>
  </View>
);

export default SearchResultItem;
