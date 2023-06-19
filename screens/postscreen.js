import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { db, firebase } from "../firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import userContext from "../context/UserProvider";
import LoadingComponent from "../components/LoadingComponent";

const Postform = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [species, setSpecies] = useState("");
  const [subspecies, setSubSpecies] = useState("");
  const [date, setDate] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);

  const handleLocationPress = () => {
    navigation.navigate("mapScreen", {
      setSelectedLocation: setSelectedLocation,
    });
  };

  const { userDetails } = useContext(userContext);
  // console.log(userDetails);

  const uploadPostToFire = async (
    image,
    description,
    species,
    subspecies,
    location
  ) => {
    setIsLoading(true);

    const response = await fetch(image);
    const blob = await response.blob();

    const base64Image = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });

    db.collection("posts")
      .add({
        username: userDetails.username,
        owner_uid: userDetails.owner_uid,
        owner_email: userDetails.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        image: base64Image,
        description: description,
        species: species,
        subSpecies: subspecies,
        date: date,
        location: location,
        verified: false,
      })
      .then(() => {
        // Reset state after successful upload
        console.log(`added photo`);
        setImage(null);
        setDescription("");
        setSpecies("");
        setSubSpecies("");
        setSelectedLocation(null);
        setIsLoading(false);
        // Go back to previous screen
        navigation.goBack();
      })
      .catch((error) => {
        console.log("Error uploading post:", error);
      });
  };

  const selectImageFromCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Camera permission is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    if (!pickerResult.canceled) {
      setImage(pickerResult.uri);
    }
  };

  const selectImageFromGallery = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Gallery permission is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setImage(pickerResult.uri);
    }
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleSpeciesChange = (text) => {
    setSpecies(text);
  };

  const handleSubSpeciesChange = (text) => {
    setSubSpecies(text);
  };

  const handlePost = () => {
    if (
      image &&
      description &&
      species &&
      subspecies &&
      selectedLocation &&
      date
    ) {
      uploadPostToFire(
        image,
        description,
        species,
        subspecies,
        selectedLocation,
        date
      );
    } else {
      alert("Please fill in all the required fields.");
    }
  };

  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Feather name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Post</Text>
          </View>

          <ScrollView>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.photoOptions}
                onPress={selectImageFromGallery}
              >
                <Feather name="folder" size={24} color="#044e5e" />
                <Text style={styles.optionText}>Select from Folder</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.photoOptions}
                onPress={selectImageFromCamera}
              >
                <Feather name="camera" size={24} color="#044e5e" />
                <Text style={styles.optionText}>Take a Photo</Text>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={styles.image} />}
              <TextInput
                style={styles.input}
                placeholder="Species"
                value={species}
                onChangeText={handleSpeciesChange}
              />
              <TextInput
                style={styles.input}
                placeholder="Subspecies"
                value={subspecies}
                onChangeText={handleSubSpeciesChange}
              />
              <TextInput
                style={styles.input}
                placeholder="description"
                value={description}
                onChangeText={handleDescriptionChange}
                multiline
              />
              <View style={styles.dateField}>
                <Text style={styles.label}>Date</Text>
                <View>
                  <Text style={styles.dateText}>
                    {date.toLocaleDateString()}
                  </Text>
                  {showPicker && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                    />
                  )}
                </View>
                <Button
                  title="Select Date"
                  onPress={() => setShowPicker(true)}
                />
              </View>
              {!selectedLocation ? (
                <TouchableOpacity
                  onPress={handleLocationPress}
                  style={styles.textField}
                >
                  <Text style={styles.placeholderText}>Select Location</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleLocationPress}
                  style={styles.selectedField}
                >
                  <Text
                    style={styles.selectedText}
                  >{`${selectedLocation.latitude}, ${selectedLocation.longitude}`}</Text>
                  <Feather name="edit" size={16} color="#000" />
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.postButton} onPress={handlePost}>
                <Text style={styles.postButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 35,
    backgroundColor: "#C9FFA8",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  backButton: {
    position: "absolute",
    left: 10,
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
    // elevation: 4
  },
  photoOptions: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#044e5e",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 8,
  },
  textField: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  placeholderText: {
    color: "#888",
  },
  selectedField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C9FFA8",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  selectedText: {
    flex: 1,
    marginRight: 10,
    color: "#000",
  },
  postButton: {
    backgroundColor: "#044e5e",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textField: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  placeholderText: {
    color: "#888",
  },
  selectedField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C9FFA8",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  selectedText: {
    flex: 1,
    marginRight: 10,
    color: "#000",
  },
  dateField: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default Postform;