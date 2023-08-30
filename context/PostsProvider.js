import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { onSnapshot } from "firebase/firestore";

const postContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    try {
      onSnapshot(db.collection("posts").orderBy("createdAt", "desc"), (d) => {
        setPosts(
          d.docs.map((post) => {
            return { ...post.data(), id: post.id };
          })
        );
      });
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <postContext.Provider value={{ posts, setPosts }}>
      {children}
    </postContext.Provider>
  );
};

export default postContext;
