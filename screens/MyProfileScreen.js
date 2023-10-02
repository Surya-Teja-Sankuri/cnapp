import React, { useContext, useEffect, useState } from "react";

import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import postContext from "../context/PostsProvider";
import userContext from "../context/UserProvider";
import { db, firebase } from "../firebase";
const MyProfileScreen = () => {
  const deletePost = (postId) => {
    // Display an alert to confirm the deletion
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            // Delete the post from the database
            db.collection("posts")
              .doc(postId)
              .delete()
              .then(() => {
                console.log("Post deleted successfully!");
                // Update the filtered posts state by removing the deleted post
                setFilteredPosts((prevPosts) =>
                  prevPosts.filter((post) => post.id !== postId)
                );
              })
              .catch((error) => {
                console.error("Error deleting post: ", error);
              });
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  const { posts } = useContext(postContext);
  const numColumns = 2;
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigation = useNavigation();
  const { userDetails } = useContext(userContext);

  useEffect(() => {
    // Filter the posts based on owner_uid
    const filtered = posts.filter(
      (post) => post.owner_email === userDetails.email
    );
    setFilteredPosts(filtered);
  }, []);

  const onPressBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("postDetails", { item: item })}
      >
        <View style={styles.imgContainer} key={index}>
          <TouchableOpacity
            style={styles.deleteButton} // Add a style for the delete button
            onPress={() => deletePost(item.id)} // Call the deletePost function with the post ID
          >
            <MaterialIcons name="delete" size={24} color="red" />
          </TouchableOpacity>
          <Image source={{ uri: item.image }} style={styles.postcss} />
          <View style={styles.imgTxtContainer}>
            <Text style={styles.imgTxt}>{item.species}</Text>
            {item.verified && (
              <AntDesign name="checkcircle" size={24} color="lightgreen" />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* <View style={styles.container}> */}
      {/* <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onPressBack}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>

        <TouchableOpacity style={styles.checkButton} onPress={onPressSave}>
          <MaterialIcons name="check" size={24} color="white" />
        </TouchableOpacity>
      </View> */}

      {/* <StatusBar backgroundColor={'rgba(36, 39, 96, 0.05)'} /> */}
      <View
        style={{
          width: "100%",
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <ImageBackground
          source={require("../assets/natural-watercolor.jpg")}
          resizeMode="cover"
          style={{
            height: 150,
            width: "100%",
          }}
        >
          <TouchableOpacity style={styles.backButton} onPress={onPressBack}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={{
            uri:
              userDetails?.image ||
              "https://cimentlawfirm.com/wp-content/uploads/2021/03/dummy-profile.png",
          }}
          resizeMode="contain"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: "#0080ff",
            borderWidth: 2,
            marginTop: -90,
          }}
        />

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            lineHeight: 22,
            color: "#0080ff",
            marginVertical: 8,
          }}
        >
          {userDetails.username}
        </Text>
        <Text
          style={{
            color: "#000",
            fontSize: 14,
            lineHeight: 20,
          }}
        >
          {userDetails.email}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="location-on" size={24} color="black" />
          <Text
            style={{
              fontSize: 14,
              lineHeight: 20,
              marginLeft: 4,
            }}
          >
            Telangana, India
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              lineHeight: 20,
              marginLeft: 4,
            }}
          >
            Bio: Nature Enthusiast
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: "40%",
            height: 36,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0080ff",
            borderRadius: 5,
            marginHorizontal: 20,
            flexDirection: "row",
          }}
          onPress={() => navigation.navigate("editProfile")}
        >
          <Text
            style={{
              fontSize: 18,
              lineHeight: 22,
              color: "#FFF",
              marginRight: 5,
            }}
          >
            Edit Profile
          </Text>
          <Feather name="edit" size={18} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.observationContainer}>
          <Text styles={{ fontWeight: "bold" }}>MY OBSERVATONS</Text>
        </View>
        <View style={styles.postContainer}>
          <FlatList
            data={filteredPosts}
            renderItem={renderItem}
            numColumns={numColumns}
            style={styles.flatlistItems}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.postContainer}
            columnWrapperStyle={{
              justifyContent: "space-evenly",
            }}
          />
        </View>
      </View>

      {/* <View
          style={{
            paddingVertical: 8,
            flexDirection: "row",
          }}
        > */}
      {/* <ImageBackground source={require('../assets/bluegreen.jpg')} style={styles.profileContainer}>
          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileNameText}>{userDetails.username}</Text>
            <Text style={styles.profileEmailText}>{userDetails.email}</Text>

          </View>

          <View style={styles.profilePictureContainer}>
            <Image
              style={styles.profilePicture}
              source={require("../assets/profilepicture.jpg")} // Replace with your own profile picture source
            />
          </View>
        </ImageBackground> */}
      {/* // marker */}
      {/* <View style={styles.infoContainer}>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="person"
              size={24}
              color="#888"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="username"
              // onChangeText={onChangeText}
            />
          </View>
          <View style={styles.inputContainer}>
            <Feather name="user" size={24} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="name"
              // onChangeText={onChangeText}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="description"
              size={24}
              color="#888"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="tell us about yourself"
              multiline
              // onChangeText={onChangeText}
            />
          </View>
        </View> */}

      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 35,
  },
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
  profileContainer: {
    flexDirection: "row",
    // width: "100%",
    paddingHorizontal: 40,
    paddingVertical: 40,
    backgroundColor: "lightgrey",
    marginBottom: 30,
  },
  profileInfoContainer: {
    flex: 1,
    marginRight: 10,
  },
  profileNameText: {
    fontSize: 20,
    fontWeight: 600,
  },
  profilePictureContainer: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  infoContainer: {
    alignItems: "center",
    paddingLeft: 10,
    gap: 15,
    width: "90%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#888",
    paddingBottom: 5,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  observationContainer: {
    width: "90%",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#0080ff",
    marginTop: 20,
  },
  imgContainer: {
    marginTop: 15,
    // margin: 10,
    marginBottom: 7,
    marginLeft: 10,
    marginHorizontal: "auto",
    position: "relative",
  },
  imgTxt: {
    color: "white",
    fontSize: 15,
  },
  imgTxtContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(28, 28, 28, 0.7)",
    width: "100%",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postContainer: {
    marginBottom: 170,
    // alignItems: "center",
  },
  postcss: {
    width: 150,
    height: 150,
    borderRadius: 15,
    borderWidth: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
  },
});

export default MyProfileScreen;
