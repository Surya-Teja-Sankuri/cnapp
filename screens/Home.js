import { StyleSheet, SafeAreaView, ImageBackground, Alert, StatusBar, Platform } from "react-native";
import Button from "../assets/button";

const Home = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/forest.jpg")}
        style={styles.backgoundImage}
      >
        <Button
          btnLabel="Lets Start"
          Press={() => props.navigation.navigate("Login")}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#004a5e",
  },
  backgoundImage: {
    flex: 1,
    // resizeMode: 'cover',
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
export default Home;
