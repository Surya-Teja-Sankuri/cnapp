import React, { useContext, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import userContext from "../context/UserProvider";
import { db } from "../firebase";
import { doc, updateDoc, Timestamp } from 'firebase/firestore';

const PostDetails = ({ navigation, route }) => {
    const { item } = route.params;

    const { userDetails } = useContext(userContext);
    console.log(item.createdAt);
    const date = new Date(item.date.seconds * 1000);
    const formattedDate = date.toISOString().split('T');
    console.log(formattedDate);

    const [verifiedTick, setVerifiedTick] = useState(item.verified);

    const handleAuthorizeButton = () => {
        Alert.alert("Verification of Picture",
            `Do you want to ${!verifiedTick ? "" : "not"} verify the picture`,
            [
                {
                    text: "yes",
                    onPress: () => submitVerified()
                },
                {
                    text: "no",
                }
            ]
        );
    }

    const submitVerified = () => {
        const newVerified = {
            verified: item.verified ? false : true,
        };
        const updateToDoc = doc(db, "posts", item.id);
        updateDoc(updateToDoc, newVerified)
            .then(() => {
                setVerifiedTick(!verifiedTick);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{item.species}</Text>
            </View>

            <ScrollView>
                <View style={styles.userdetails}>
                    <Text style={styles.usernameText}>Posted by: <Text style={styles.username}>{item.username}</Text></Text>
                    <Text style={styles.usernameText}>{formattedDate[0]}</Text>
                </View>
                <Image source={{ uri: item.image }} style={styles.image} />

                <TouchableOpacity style={styles.button} disabled={!userDetails.Authorized} onPress={handleAuthorizeButton}>
                    <Feather name="check-circle" size={24} color={verifiedTick ? "green" : "grey"} />
                    <Text style={verifiedTick ? styles.label : styles.notLabel}>Verified</Text>
                </TouchableOpacity>

                <Text style={styles.speciesText}>Species: {item.species}</Text>
                <Text style={styles.subSpeciesText}>
                    Sub-species: {item.subSpecies}
                </Text>
                <Text style={styles.descriptionText}>
                    Description: {item.description}
                </Text>

                {/* Render map */}
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: item.location.latitude,
                        longitude: item.location.longitude,
                        latitudeDelta: 0.1444,
                        longitudeDelta: 0.1444,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: item.location.latitude,
                            longitude: item.location.longitude,
                        }}
                    />
                </MapView>

                {/* Render other post details */}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: '100%',
        height: 300,
        marginBottom: 24,
    },
    speciesText: {
        fontSize: 16,
        marginBottom: 12,
    },
    subSpeciesText: {
        fontSize: 16,
        marginBottom: 12,
    },
    descriptionText: {
        fontSize: 16,
        marginBottom: 12,
    },
    userdetails: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    usernameText: {
        fontSize: 16,
    },
    username: {
        fontWeight: "600",
    },
    map: {
        width: 300,
        height: 200,
        marginBottom: 24,
    },
    // new stylings
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: "flex-start",
    },
    label: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
    notLabel: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'grey',
    }
});

export default PostDetails;