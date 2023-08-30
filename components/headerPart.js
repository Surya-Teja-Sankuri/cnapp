import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
  TextInput,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Post from "./Postpart";

export default function Header({setSearchFilter, navigation}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchIconClick = () => {
    setSearchText("");
    setIsSearchOpen(false);
    setSearchFilter(""); // Clear the search filter
  };

  const handleChangeText = (text) => {
    setSearchText(text);
    setSearchFilter(text); // Pass the search filter to the parent component
  };

  const openDrawer = () => {
    navigation.openDrawer(); // Open the drawer
  };

  // const [searchFilter] = useState("");

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={openDrawer}>
          <FontAwesome
            style={{ padding: 15, color: "#004a5e" }}
            name="bars"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        {!isSearchOpen && <Text style={styles.explore}>Explore</Text>}
        {!isSearchOpen && (
          <TouchableOpacity onPress={handleSearchClick}>
            <FontAwesome
              style={{ padding: 15, color: "#004a5e" }}
              name="search"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        )}
        {isSearchOpen && (
          <View style={styles.searchBar}>
            <TouchableOpacity onPress={handleSearchIconClick}>
              <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              value={searchText}
              onChangeText={handleChangeText}
              placeholder="Search"
              placeholderTextColor="#000000"
            />
          </View>
        )}
      </View>
      {/* <View>
        <Post navigation={navigation} searchFilter={searchFilter} />
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 0,
    backgroundColor: "#C9FFA8",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  explore: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#004a5e",
    borderColor: "black",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000000",
  },
});