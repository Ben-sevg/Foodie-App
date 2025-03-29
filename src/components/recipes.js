import { View, Text, Pressable, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ categories, foods }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
<ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
            <Text style={styles.title} testID="title">Our Recipes</Text>

      <View testID="recipesDisplay">
      <FlatList
            data={foods}
            keyExtractor={(item) => item.idFood}
            renderItem={renderItem}
            numColumns={2}
          />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  return (
    <View
      style={[styles.cardContainer, { paddingLeft: 20, paddingRight: 15}]} testID="articleDisplay"
    >
         <TouchableOpacity
        onPress={() => navigation.navigate("RecipeDetail", { ...item })}
      >
        <Image
          source={{ uri: item.recipeImage }}
          style={[styles.recipeImage, { height: index % 3 === 0 ? hp(25) : hp(35) }]}
        />
        <Text style={styles.recipeText}>
          {item.recipeName.length > 20 ? item.recipeName.slice(0, 20) + "..." : item.recipeName}
        </Text>
        <Text style={styles.recipeDescription}>
          {item.recipeInstructions.length > 40 ? item.recipeInstructions.slice(0, 40) + "..." : item.recipeInstructions}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4), // mx-4 equivalent
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "600", // font-semibold
    color: "#52525B", // text-neutral-600
    marginBottom: hp(1.5),
  },
  loading: {
    marginTop: hp(20),
  },
  cardContainer: {
    justifyContent: "center",
    marginBottom: hp(1.5),
    flex: 1, // Allows cards to grow and fill space evenly
  },
  articleImage: {
    width: "100%",
   
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.05)", // bg-black/5
  },
  articleText: {
    fontSize: hp(1.5),
    fontWeight: "600", // font-semibold
    color: "#52525B", // text-neutral-600
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  articleDescription: {
    fontSize: hp(1.2),
    color: "#6B7280", // gray-500
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  row: {
    justifyContent: "space-between", // Align columns evenly
  },
});
