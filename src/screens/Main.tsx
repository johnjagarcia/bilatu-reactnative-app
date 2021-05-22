import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { RefreshControl, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MainCategories from "../components/MainCategories";
import AppHeader from "../components/Header";
import ListLoader from "../components/ListLoader";
import Searcher from "../components/Searcher";
import { Colors } from "../utils/colors";
import BusinessCategories from "../components/BusinessCategories";

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
      getBusinessCategories {
        _id
        name
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

          <MainCategories data={data} navigation={navigation} />

          {/* <Categories title="Servicios" type="SERVICE" navigation={navigation} /> */}

          <BusinessCategories data={data} navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
