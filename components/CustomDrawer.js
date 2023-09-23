import { useContext, useEffect, useState } from "react";
import { DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { React } from 'react'
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { firebase } from "../firebase";
import userContext from "../context/UserProvider";

const CustomDrawer=(props) => {
    const handleSignout = () => {
        try{
            firebase.auth().signOut();
            console.log("signed out");
        }
        catch(error){
            console.log(error.message);
        }
    };
    const { userDetails } = useContext(userContext);
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <ImageBackground source={require('../assets/bluegreen2.jpg')} 
                style={{padding: 30}}>
                    <Image source={{uri: userDetails?.image}}
                    style={styles.profilePic}
                    />
                    <Text style={{color: 'black', fontSize: 18}}>{userDetails?.username}</Text>
                    <Text style={{color: 'black'}}>{userDetails?.email}</Text>
                </ImageBackground>
                <View style={{flex: 1, marginTop: 10}}>
                    <DrawerItemList {...props}/>
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomView}>
                <TouchableOpacity onPress={handleSignout}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons name="exit-outline" size={22} color="black" />
                        <Text style={{fontSize: 15, marginLeft: 8}}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer;

const styles=StyleSheet.create({
    profilePic: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10
    },
    bottomView: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        marginBottom: 85,
    }
})