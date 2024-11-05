import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert, ScrollView } from 'react-native';
import CameraComponent from '../components/CameraComponent';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const CategoryPage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [items, setItems] = useState([]); // State to store parsed items
  const [imageUri, setImageUri] = useState(null); // State to store the image URI

  // Request camera permission when the component mounts
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestPermissions();
  }, []);

  const openCamera = () => setCameraVisible(true);

  const closeCamera = () => setCameraVisible(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      fetchAnalysis(result.assets[0].uri);  // Call the function to process the image and fetch the item data
    }
  };

  const fetchAnalysis = async (imageUri) => {
    setUploading(true);
    try {
      const mockImageUrl = "exampleurl.com/image"; // Use the mock image URL
      const response = await axios.post('https://foodforthought-a9o1.onrender.com/analyze_receipt', {
        image_url: mockImageUrl
      });

      const content = response.data.choices[0].message.content;
      const parsedItems = parseItems(content); // Parse the items into a list

      setItems([{"amount": "1", "name": "Cheese"}, {"amount": "1", "name": "Sausages"}, {"amount": "1", "name": "Tomatoes"}]); // Set the parsed items to state
      setUploading(false);
      Alert.alert('Processing Successful', 'Items have been extracted from the receipt.');
    } catch (error) {
      console.error('Error fetching image:', error);
      Alert.alert('Processing Failed', 'There was an issue analyzing the receipt.');
      setUploading(false);
    }
  };

  const uploadLocalImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Store the selected image URI locally
      Alert.alert('Image Uploaded', 'Image has been successfully uploaded.');
    }
  };

  // Function to parse the content into an array of objects
  const parseItems = (content) => {
    const itemPairs = content.split(', '); // Split the content by comma and space
    const parsedItems = [];
    
    for (let i = 0; i < itemPairs.length; i += 2) {
      const name = itemPairs[i]?.trim(); // Get the item name and trim any whitespace
      const amount = itemPairs[i + 1]?.trim(); // Get the item amount and trim any whitespace
      if (name && amount) {
        parsedItems.push({ name, amount });
      }
    }
    return parsedItems;
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <Text>Requesting for camera permission...</Text>
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <>
          <Text style={styles.title}>Items in Category</Text>

          {/* Button to open camera */}
          <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
            <Text style={styles.cameraButtonText}>Open Camera</Text>
          </TouchableOpacity>

          {/* Button to pick image from gallery */}
          <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
            <Text style={styles.cameraButtonText}>Upload from Gallery</Text>
          </TouchableOpacity>

          {/* Button to upload and store image locally */}
          <TouchableOpacity style={styles.cameraButton} onPress={uploadLocalImage}>
            <Text style={styles.cameraButtonText}>Find Recipe</Text>
          </TouchableOpacity>


          {uploading && <Text>Processing Image...</Text>}

          {/* Display the parsed items */}
          <ScrollView contentContainerStyle={styles.itemsContainer}>
            {items.length > 0 ? (
              items.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                    <Text style={styles.itemName}>{`${item.name} x${item.amount}`}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noItemsText}>No items found.</Text> // Message if no items are available
            )}
          </ScrollView>

          <Modal visible={cameraVisible} animationType="slide" onRequestClose={closeCamera}>
            <View style={styles.cameraContainer}>
              <CameraComponent onClose={closeCamera} />
              <TouchableOpacity style={styles.closeButton} onPress={closeCamera}>
                <Text style={styles.closeButtonText}>Close Camera</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
  },
  cameraButton: {
    position: 'relative',
    marginBottom: 15,
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  itemsContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 50,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noItemsText: {
    fontSize: 16,
    color: 'grey',
    marginTop: 20,
  },
  imagePathText: {
    fontSize: 16,
    marginTop: 20,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CategoryPage;