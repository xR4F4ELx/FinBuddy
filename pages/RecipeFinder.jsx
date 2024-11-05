import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../styles/styles'; // Assuming you have a separate styles.js file

const RecipeFinder = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null); // State to store the image path

  // Function to pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Store the image path in the state
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload an Image</Text>

      {/* Button to open image picker */}
      <TouchableOpacity onPress={pickImage} style={styles.imageUploadButton}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>

      {/* Show the selected image or a message if no image is selected */}
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      ) : (
        <Text style={styles.noImageText}>No image selected.</Text>
      )}

      {/* Button to navigate back to home */}
      <Button title="Back to Home" onPress={() => navigation.goBack()} />

      {/* Show the image URI path */}
      {imageUri && (
        <Text style={styles.imagePathText}>Image Path: {imageUri}</Text>
      )}
    </View>
  );
};

export default RecipeFinder;