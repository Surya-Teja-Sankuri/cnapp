import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

const MapScreen = ({ route }) => {
    const navigation = useNavigation();
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleMapPress = (event) => {
        const { longitude, latitude } = event.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
    };

    const handleSaveLocation = () => {
        route.params.setSelectedLocation(selectedLocation);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map} onPress={handleMapPress}>
                {selectedLocation && (
                    <Marker coordinate={selectedLocation} />
                )}
            </MapView>
            <View style={styles.buttonContainer}>
                <Text style={styles.buttonText} onPress={handleSaveLocation}>Save Location</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        backgroundColor: "#C9FFA8",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
});

export default MapScreen;
