import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
  Button,
  Divider,
} from "react-native";
// import {Divider} from '@rneui/themed';
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Header from "../components/headerPart";
import Tabs from "../components/Tabs";
import Explorescreen from "./Explore";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "../components/CustomDrawer";
import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();
function MyDrawer() {
  const navigation = useNavigation();

  function Notifications({ navigation }) {
    const openDrawer = () => {
      navigation.openDrawer(); // Open the drawer
    };
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={openDrawer}>
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>About cNature</Text>
          <Image
            source={require("../assets/treeii.jpg")}
            style={styles.image}
          />
          <Text style={styles.description}>
            cNature is a mobile application dedicated to exploring and
            documenting the wonders of the natural world. With cNature, you can:
          </Text>
          <Text style={styles.listItem}>
            - Record observations of plants, animals, insects, and more in your
            local environment.
          </Text>
          <Text style={styles.listItem}>
            - Collaborate with a community of nature enthusiasts and scientists.
          </Text>
          <Text style={styles.listItem}>
            - Learn about different species and ecosystems through shared
            observations.
          </Text>
          <Text style={styles.listItem}>
            - Contribute to scientific research and conservation efforts.
          </Text>
          <Text style={styles.description}>
            Join us in celebrating the beauty of nature and making a positive
            impact on our planet!
          </Text>
          <Text style={styles.version}>Version 1.0</Text>
        </View>
      </View>
    );
  }
  return (
    <Drawer.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#ddeddd",
        drawerActiveTintColor: "#004a5e",
        drawerLabelStyle: {
          marginLeft: -25,
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Explore"
        component={Explorescreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={Notifications}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name="information-circle-outline"
              size={18}
              color="black"
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    // marginTop: 35,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#C9FFA8",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  backButton: {
    position: "absolute",
    left: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    marginTop: 0,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    textAlign: "left",
    marginLeft: 20,
    marginBottom: 5,
  },
  version: {
    fontSize: 12,
    marginTop: 20,
  },
  image: {
    width: 160, // Adjust the width as needed
    height: 160, // Adjust the height as needed
    marginBottom: 10,
  },
});
export default MyDrawer;
