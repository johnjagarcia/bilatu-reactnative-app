import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "../utils/colors";
import { List } from "react-content-loader";

const Item = ({ business, key }) => (
  <View
    key={key}
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
          source={require("../images/business.png")}
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
          {business.name}
        </Text>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 3 }}>
            <Text
              style={{
                fontSize: 12,
                color: Colors.InfoText,
              }}
            >
              {/* {business.categoryName} */}
            </Text>
          </View>

          <View style={{ flex: 4 }}>
            <Text
              style={{
                fontSize: 12,
                color: Colors.DarkAccent,
              }}
            >
              {/* {business.address} */}
            </Text>
          </View>
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
      {business.data.map((product: { title: string }, index: number) => (
        <View
          key={index}
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: Colors.DarkAccent,
              borderRadius: 15,
            }}
          >
            <Image
              source={require("../images/generic.png")}
              style={{ width: 80, borderRadius: 10, height: 80 }}
            />
          </View>

          <View style={{ paddingVertical: 5 }}>
            <Text
              style={{
                fontSize: 11,
                color: Colors.InfoText,
                width: 100,
                textAlign: "center",
              }}
            >
              {product.title}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  </View>
);

const NearProductList = ({ route }) => {
  const { subcategoryId, criteria } = route.params;

  const NEAR_PRODUCTS_QUERY = gql`
    query {
      getProducts(subcategoryid: "${subcategoryId}", criteria: "${criteria}") {
        name
        data {
          _id
          title
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(NEAR_PRODUCTS_QUERY);

  const MyListLoader = () => <List />;

  if (loading) return <MyListLoader />;

  return (
    <FlatList
      data={data.getProducts}
      renderItem={({ item }) => {
        return <Item key={item._id} business={item} />;
      }}
      keyExtractor={(item) => item._id}
    />
  );
};

export default NearProductList;
