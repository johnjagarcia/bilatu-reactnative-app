import { gql, useQuery } from "@apollo/client";
import React from "react";
import { List } from "react-content-loader/native";
import { FlatList, StyleSheet, Text, View, StatusBar } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const SubCategoriesList = ({ route, navigation }) => {
  const { categoryId } = route.params;

  const SUBCATEGORIES_QUERY = gql`
    query {
      getSubcategories(categoryid: "${categoryId}") {
        _id
        name
        type
        active
        createdAt
        updatedAt
      }
    }
  `;

  const { data, loading, error } = useQuery(SUBCATEGORIES_QUERY);

  const MyListLoader = () => (
    <List
      width={400}
      height={400}
      viewBox="0 0 100 100"
      style={{ width: "100%" }}
    />
  );

  if (loading) return <MyListLoader />;

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#ccc",
        }}
      />
    );
  };

  const Item = ({ title, subcategoryId }) => (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate("Near", { subcategoryId, criteria: "" })
      }
      underlayColor="white"
    >
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <FlatList
      data={data.getSubcategories}
      renderItem={({ item }) => (
        <Item key={item._id} title={item.name} subcategoryId={item._id} />
      )}
      keyExtractor={(item) => item._id}
      ItemSeparatorComponent={FlatListItemSeparator}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 12,
  },
});

export default SubCategoriesList;
