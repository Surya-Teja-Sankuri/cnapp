import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Header from '../components/headerPart';
import Tabs from '../components/Tabs';
import Explorescreen from './Explore';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawer from '../components/CustomDrawer';
const Drawer = createDrawerNavigator();

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator 
    initialRouteName='Explore'
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: '#ddeddd',
      drawerActiveTintColor: '#004a5e',
      drawerLabelStyle: {
        marginLeft: -25,
      }
    }}
    drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Explore" component={Explorescreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={18} color={color} />
          )
        }}      
      />
      <Drawer.Screen name="About" component={Notifications} 
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="information-circle-outline" size={18} color="black" />
          )
        }} 
      />
    </Drawer.Navigator>
  );
}
export default MyDrawer;