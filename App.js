import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthNavigation from "./AuthNavigation";
import Postform from "./screens/postscreen";
import PostDetail from "./screens/imageex";
import AllPosts from "./screens/PostImage";
import { UserProvider } from "./context/UserProvider";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthNavigation />
  );
}

export default App;
// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { createDrawerNavigator }
// 		from '@react-navigation/drawer';
// import { NavigationContainer }
// 		from '@react-navigation/native';

// function HomeScreen() {
// return (
// 	<View style={{ flex: 1, alignItems: 'center',
// 				justifyContent: 'center' }}>
// 		<Text>Home page</Text>
// 	</View>
// );
// }

// function NotificationsScreen() {
// return (
// 	<View style={{ flex: 1, alignItems: 'center',
// 				justifyContent: 'center' }}>
// 	<Text>Notifications Page</Text>
// 	</View>
// );
// }

// function AboutScreen() {
// return (
// 	<View style={{ flex: 1, alignItems: 'center',
// 				justifyContent: 'center' }}>
// 	<Text>About Page</Text>
// 	</View>
// );
// }
// const Drawer = createDrawerNavigator();

// export default function App() {
// return (
// 	<NavigationContainer>
// 	<Drawer.Navigator initialRouteName="Home">
// 		<Drawer.Screen name="Home" component={HomeScreen} />
// 		<Drawer.Screen name="Notifications"
// 					component={NotificationsScreen} />
// 		<Drawer.Screen name="About" component={AboutScreen} />
// 	</Drawer.Navigator>
// 	</NavigationContainer>
// );
// }
