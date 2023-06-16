import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import postContext from "../context/PostsProvider";
import { AntDesign } from '@expo/vector-icons';

const numColumns = 2;

export default function Post({ navigation, searchFilter }) {

  const { posts } = useContext(postContext);

  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    // Filter the posts based on the search filter
    if (searchFilter) {
      const filteredData = posts.filter((post) =>
        post.species.toLowerCase().startsWith(searchFilter.toLowerCase())
      );
      setFilteredPosts(filteredData);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchFilter, posts]);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("postDetails", { item: item })}
      >
        <View style={styles.imgContainer} key={index}>
          <Image source={{ uri: item.image }} style={styles.postcss} />
          <View style={styles.imgTxtContainer}>
            <Text style={styles.imgTxt}>{item.species}</Text>
            {item.verified && <AntDesign name="checkcircle" size={24} color="lightgreen" />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.postContainer}>
      <FlatList
        data={filteredPosts}
        renderItem={renderItem}
        numColumns={numColumns}
        style={styles.flatlistItems}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.postContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    marginTop: 15,
    // margin: 10,
    marginBottom: 7,
    marginLeft: 10,
    marginHorizontal: "auto",
    position: "relative",
  },
  imgTxt: {
    color: "white",
    fontSize: 15,
  },
  imgTxtContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(28, 28, 28, 0.7)",
    width: "100%",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postContainer: {
    marginBottom: 170,
    alignItems: "center",
  },
  postcss: {
    width: 150,
    height: 150,
    borderRadius: 15,
    borderWidth: 10,
  },
});