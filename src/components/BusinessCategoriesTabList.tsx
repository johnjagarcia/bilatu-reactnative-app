import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Image, Text, View } from "react-native";
import SectionList from "react-native-tabs-section-list";
import ListLoader from "./ListLoader";

export default function BusinessCategoriesTabList({ navigation }) {
  const { data, loading } = useQuery(gql`
    query {
      getBusinessCategoriesGroup {
        _id
        name
        businessCategories {
          name
          image {
            type
            data
          }
        }
        active
        createdAt
        updatedAt
      }
    }
  `);

  if (loading) return <ListLoader />;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {data ? (
        <SectionList
          sections={data.getBusinessCategoriesGroup.map(
            (bc: { name: string; businessCategories: [] }) => ({
              name: bc.name,
              data: bc.businessCategories,
            })
          )}
          keyExtractor={(item) => item.name}
          stickySectionHeadersEnabled={false}
          scrollToLocationOffset={50}
          tabBarStyle={{
            backgroundColor: "#fff",
            borderBottomColor: "#f4f4f4",
            borderBottomWidth: 1,
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 0.5,
                width: "96%",
                alignSelf: "flex-end",
                backgroundColor: "#eaeaea",
              }}
            />
          )}
          renderTab={({ name, isActive }) => (
            <View
              style={[
                {
                  borderBottomColor: "#090909",
                },
                { borderBottomWidth: isActive ? 1 : 0 },
              ]}
            >
              <Text
                style={[
                  {
                    padding: 15,
                    color: "#9e9e9e",
                    fontSize: 18,
                    fontWeight: "500",
                  },
                  { color: isActive ? "#090909" : "#9e9e9e" },
                ]}
              >
                {name}
              </Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View>
              <View
                style={{
                  height: 10,
                  backgroundColor: "#f6f6f6",
                  borderTopColor: "#f4f4f4",
                  borderTopWidth: 1,
                  borderBottomColor: "#f4f4f4",
                  borderBottomWidth: 1,
                }}
              />
              <Text
                style={{
                  color: "#010101",
                  backgroundColor: "#fff",
                  fontSize: 23,
                  fontWeight: "bold",
                  paddingTop: 25,
                  paddingBottom: 5,
                  paddingHorizontal: 15,
                }}
              >
                {section.name}
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                backgroundColor: "#fff",
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
                    width: 25,
                    height: 25,
                  }}
                  source={
                    item.image
                      ? {
                          uri: `data:${item.image.type};base64,${item.image.data}`,
                        }
                      : require("../images/generic.png")
                  }
                />
                <Text
                  style={{
                    fontSize: 18,
                    color: "#131313",
                    marginLeft: 10,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text>No hay nada para mostrar</Text>
      )}
    </View>
  );
}
