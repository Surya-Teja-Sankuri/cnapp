import React, { useContext, useState } from "react";

import { Feather, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import {
  Image,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import userContext from "../context/UserProvider";
import { db } from "../firebase";
import LoadingComponent from "../components/LoadingComponent";

const EditProfile = ({ navigation }) => {
  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressSave = () => {
    console.log(`save button pressed`);
  };

  const { userDetails } = useContext(userContext);
  const [name, setName] = useState(userDetails.username);
  // console.log(userDetails);
  const [password, setPassword] = useState("randompassword");
  const [country, setCountry] = useState("Telangana, India");
  const [bio, setBio] = useState("Bio");
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    userDetails?.image ||
      "https://cimentlawfirm.com/wp-content/uploads/2021/03/dummy-profile.png"
  );
  const startDate = moment("1990-01-01").format("YYYY/MM/DD");
  const [selectedStartDate, setSelectedStartDate] = useState("01/01/1990");
  const [startedDate, setStartedDate] = useState("01/01/1990");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const handleChangeStartDate = (propDate) => {
    setStartedDate(propDate);
  };

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  const uploadPostToFire = async (
    name,
    password,
    country,
    bio,
    selectedImage
  ) => {
    const response = await fetch(selectedImage);
    const blob = await response.blob();

    const base64Image = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
    setIsLoading(true);

    db.collection("users")
      .doc(userDetails.email)
      .set(
        {
          username: name,
          image: base64Image,
          bio: bio,
          country: country,
        },
        { merge: true }
      )
      .then(() => {
        // Reset state after successful upload
        console.log("Success");
        navigation.goBack();
      })
      .catch((error) => {
        console.log("Error uploading post:", error);
      })
      .finally(() => setIsLoading(false));
  };

  function renderDatePicker() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openStartDatePicker}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "#242760",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              padding: 35,
              width: "90%",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date) => setSelectedStartDate(date)}
              options={{
                backgroundColor: "#242760",
                textHeaderColor: "#469ab6",
                textDefaultColor: "#FFF",
                selectedTextColor: "#FFF",
                mainColor: "#469ab6",
                textSecondaryColor: "#FFF",
                borderColor: "rgba(122,146,165,0.1)",
              }}
            />

            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text style={{ fontSize: 16, lineHeight: 22, color: "#FFF" }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  const saveChange = () => {
    uploadPostToFire(name, password, country, bio, selectedImage);
  };

  // console.log(userDetails)
  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onPressBack}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>

        <TouchableOpacity style={styles.checkButton} onPress={onPressSave}>
          <MaterialIcons name="check" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* // marker */}
      <View
        style={{
          alignItems: "center",
          marginVertical: 22,
        }}
      >
        <TouchableOpacity onPress={handleImageSelection}>
          <Image
            source={{ uri: selectedImage }}
            style={{
              height: 130,
              width: 130,
              borderRadius: 85,
              borderWidth: 2,
              borderColor: "#0080ff",
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: 10,
              zIndex: 9999,
            }}
          >
            <MaterialIcons name="photo-camera" size={32} color={"#0080ff"} />
          </View>
        </TouchableOpacity>
      </View>
      {/* marker */}
      {/* marker2 */}
      <View style={styles.overallFieldView}>
        <Text style={{ fontWeight: "bold", fontSize: 16, lineHeight: 20 }}>
          Name
        </Text>
        <View style={styles.fieldBoxView}>
          <TextInput
            value={name}
            onChangeText={(value) => setName(value)}
            editable={true}
          />
        </View>
      </View>
      <View style={styles.overallFieldView}>
        <Text style={{ fontWeight: "bold", fontSize: 16, lineHeight: 20 }}>
          Your Password
        </Text>
        <View
          style={{
            height: 44,
            width: "100%",
            borderColor: "rgba(84, 76, 76, 0.14)",
            borderWidth: 1,
            borderRadius: 4,
            marginVertical: 6,
            justifyContent: "center",
            paddingLeft: 8,
            flexDirection: "row",
          }}
        >
          <TextInput
            value={password}
            onChangeText={(value) => setPassword(value)}
            editable={true}
            secureTextEntry={!isPasswordVisible}
            style={{ flex: 1 }}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ paddingTop: 8, paddingRight: 8 }}
          >
            <Feather
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={20}
              color={isPasswordVisible ? "#0080ff" : "gray"} // Change icon color based on visibility state
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.overallFieldView}>
        <Text style={{ fontWeight: "bold", fontSize: 16, lineHeight: 20 }}>
          Location
        </Text>
        <View style={styles.fieldBoxView}>
          <TextInput
            value={country}
            onChangeText={(value) => setCountry(value)}
            editable={true}
          />
        </View>
      </View>
      <View style={styles.overallFieldView}>
        <Text style={{ fontWeight: "bold", fontSize: 16, lineHeight: 20 }}>
          Date of Birth
        </Text>
        <TouchableOpacity
          onPress={handleOnPressStartDate}
          style={styles.fieldBoxView}
        >
          <Text>{selectedStartDate}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.overallFieldView}>
        <Text style={{ fontWeight: "bold", fontSize: 16, lineHeight: 20 }}>
          Tell me about yourself
        </Text>
        <View style={styles.fieldBoxView}>
          <TextInput
            value={bio}
            onChangeText={(value) => setBio(value)}
            editable={true}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: !isLoading ? "#0398fc" : "#AEB0AD",
            height: 44,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={saveChange}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <Text
              style={{
                // fontFamily: 'regular',
                fontSize: 18,
                lineHeight: 22,
                color: "#FFFFFF",
              }}
            >
              Save Changes
            </Text>
          )}
        </TouchableOpacity>
        {renderDatePicker()}
      </View>
      {/* marker2 */}
    </>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#C9FFA8",
    elevation: 4, // Add elevation for border shadow (Android)
    shadowColor: "#000", // Add shadow properties for border shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  checkButton: {
    padding: 5,
    backgroundColor: "#0398fc",
    // backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  overallFieldView: {
    flexDirection: "column",
    marginBottom: 6,
    paddingHorizontal: 22,
  },
  fieldBoxView: {
    height: 44,
    width: "100%",
    borderColor: "rgba(84, 76, 76, 0.14)",
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 6,
    justifyContent: "center",
    paddingLeft: 8,
  },
});

export default EditProfile;
