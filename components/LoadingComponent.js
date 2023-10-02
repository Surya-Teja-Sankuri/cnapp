import { View, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

export default function LoadingComponent() {
  return (
    <View style={styles.loading}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#029c2b" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
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
  },
});
