import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Button, RefreshControl, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Categories from "../components/Categories";
import AppHeader from "../components/Header";
import ListLoader from "../components/ListLoader";
import Searcher from "../components/Searcher";
import { Colors } from "../utils/colors";

export default function MainScreen({ navigation }) {
  const CATEGORIES_QUERY = gql`
    query {
      getCategories(type: "PRODUCT", onlyPopular: true) {
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

  const [refreshing, setRefreshing] = useState(false);

  const { data, loading, refetch } = useQuery(CATEGORIES_QUERY);

  if (loading || refreshing) return <ListLoader />;

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <AppHeader />
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          height: "100%",
          backgroundColor: Colors.Background,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await refetch();
              setRefreshing(false);
            }}
          />
        }
      >
        <View style={{ padding: 10 }}>
          <Searcher navigation={navigation} />

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
              Productos
            </Text>

            <Button
              onPress={() => {
                navigation.navigate("Search", {
                  screen: "Productos",
                });
              }}
              title="Ver todos"
              color={Colors.InfoText}
              accessibilityLabel="Ver todas las categorías de productos"
            />
          </View>

          <Categories data={data} navigation={navigation} />
          {/* <Categories title="Servicios" type="SERVICE" navigation={navigation} /> */}

          {/* <Promotions /> */}
        </View>
      </ScrollView>
    </View>
  );
}
