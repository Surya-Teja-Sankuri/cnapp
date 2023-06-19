import { View, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

export default function LoadingComponent() {
  return (
    <View style={styles.loading}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});