import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex, onRecipeEdited } = route.params || {};
  const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : "");
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
  const [description, setDescription] = useState(recipeToEdit ? recipeToEdit.description : "");

  const saveRecipe = async () => {
    const newRecipe = { title, image, description };

    try {
      const existingRecipes = await AsyncStorage.getItem("customRecipes");
      const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];

      // If editing, update the existing recipe, else add new one
      if (recipeToEdit !== undefined) {
        recipes[recipeIndex] = newRecipe; // Update recipe
        await AsyncStorage.setItem("customRecipes", JSON.stringify(recipes));

        // Notify parent about the edit
        if (onRecipeEdited) onRecipeEdited();
      } else {
        recipes.push(newRecipe); // Add new recipe
        await AsyncStorage.setItem("customRecipes", JSON.stringify(recipes));
      }

      navigation.goBack(); // Navigate back after saving
    } catch (error) {
      console.error("Error saving the recipe:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
      />
      <TouchableOpacity onPress={saveRecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  input: {
    marginTop: hp(4),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(1),
    marginVertical: hp(1),
  },
  image: {
    width: 300,
    height: 200,
    margin: wp(2),
  },
  imagePlaceholder: {
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    padding: wp(2),
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: wp(1),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
