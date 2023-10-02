import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";

const Home = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/forest.jpg")}
        style={styles.backgoundImage}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Login")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Let's Start</Text>
        </TouchableOpacity>
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
  button: {
    width: 250,
    height: 60,
    backgroundColor: "rgba(0, 0, 0, 0.63)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginBottom: 100,
  },
  buttonText: {
    color: "#C9FFA8",
    fontSize: 26,
    fontWeight: 500,
    // fontFamily: 'inter'
  },
});
export default Home;
