import React from "react";
import { View, StyleSheet, Text } from "react-native";

function UserProfile({ navigation, route }) {
  const owner_uid = route.params;
  console.log(owner_uid);

  return (
    <View style={styles.container}>
      <Text>UserProfile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default UserProfile;
