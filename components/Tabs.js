import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Explorescreen from "../screens/Explore";
import Postform from "../screens/postscreen";
import EditProfile from "../screens/EditProfile";
import MyDrawer from "../screens/MyDrawer";

const Tab = createBottomTabNavigator();
const logoColor = (focused) => (focused ? "#00f0a2" : "#fff");

const CustomPostButton = ({ children, navigation }) => (
  <TouchableOpacity
    style={{
      top: -35,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={() => navigation.navigate("postpage")}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#C9FFA8",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export default function Tabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          elevation: 0,
          backgroundColor: "#044e5e",
          height: 75,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={MyDrawer}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.footerIcons}>
              <FontAwesome name="home" size={38} color={logoColor(focused)} />
              <Text style={{ color: logoColor(focused) }}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={Postform}
        options={{
          tabBarIcon: () => <Feather name="plus" size={45} color="#044e5e" />,
          tabBarButton: (props) => (
            <CustomPostButton {...props} navigation={navigation} />
          ),
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={EditProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.footerIcons}>
              <FontAwesome name="user" size={38} color={logoColor(focused)} />
              <Text style={{ color: logoColor(focused) }}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  footerIcons: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
