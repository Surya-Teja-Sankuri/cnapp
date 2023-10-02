import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather, FontAwesome } from "@expo/vector-icons";
import userContext from "../context/UserProvider";
import { db } from "../firebase";
import { doc, updateDoc, Timestamp, collectionGroup } from "firebase/firestore";

const PostDetails = ({ navigation, route }) => {
  const { item } = route.params;

  const { userDetails } = useContext(userContext);
  const date = new Date(item.date.seconds * 1000);
  const formattedDate = date.toISOString().split("T");
  console.log(formattedDate);

  const [verifiedTick, setVerifiedTick] = useState(item.verified);

  const handleAuthorizeButton = () => {
    Alert.alert(
      "Verification of Picture",
      `Do you want to ${!verifiedTick ? "" : "not"} verify the picture`,
      [
        {
          text: "yes",
          onPress: () => submitVerified(),
        },
        {
          text: "no",
        },
      ]
    );
  };

  const submitVerified = async () => {
    const newVerified = {
      verified: !item.verified,
    };
    await db
      .collection("posts")
      .doc(item.id)
      .update({
        verified: newVerified,
      })
      .then(() => {
        setVerifiedTick(newVerified);
        console.log("verified updated");
      })
      .catch((error) => console.log("error at verified field ", error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{item.species}</Text>
      </View>

      <ScrollView>
        <View style={styles.userdetails}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("userProfile", { owner_uid: item.owner_uid })
            }
            style={styles.userProfile}
          >
            <FontAwesome name="user" size={24} color="black" />
            <Text style={styles.username}>{item.username}</Text>
          </TouchableOpacity>
          <Text>{formattedDate[0]}</Text>
        </View>
        <Image source={{ uri: item.image }} style={styles.image} />

        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            gap: 5,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            disabled={!userDetails?.Authorized}
            onPress={handleAuthorizeButton}
          >
            <Feather
              name="check-circle"
              size={24}
              color={verifiedTick ? "green" : "grey"}
            />
            <Text style={verifiedTick ? styles.label : styles.notLabel}>
              Verified
            </Text>
          </TouchableOpacity>

          <Text style={{ fontWeight: "600", fontSize: 16 }}>
            Species: <Text style={{ fontWeight: "500" }}>{item.species}</Text>
          </Text>
          <Text style={{ fontWeight: "600", fontSize: 16 }}>
            Subspecies:{" "}
            <Text style={{ fontWeight: "500" }}>{item.subSpecies}</Text>
          </Text>
          <Text style={{ fontWeight: "600", fontSize: 16 }}>
            Description:{" "}
            <Text style={{ fontWeight: "500" }}>{item.description}</Text>
          </Text>
        </View>

        {/* Render map */}
        <View
          style={{
            alignItems: "center",
          }}
        >
          <View style={styles.map}>
            <MapView
              style={{ width: 300, height: 200 }}
              initialRegion={{
                latitude: item.location.latitude,
                longitude: item.location.longitude,
                latitudeDelta: 0.005,

                longitudeDelta: 0.005,
              }}
            >
              <Marker
                coordinate={{
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
                }}
              />
            </MapView>
          </View>
        </View>

        {/* Render other post details */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userProfile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
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
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 48,
  },
  image: {
    width: "100%",
    height: 300,
  },
  userdetails: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EAEAEA",
  },
  username: {
    fontSize: 18,
    fontWeight: "500",
  },
  map: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  // new stylings
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  label: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  notLabel: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
  },
});

export default PostDetails;
