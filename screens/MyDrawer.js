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

  function Notifications() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About</Text>
        </View>
        <Text>Notifications Screen</Text>
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
});
export default MyDrawer;
