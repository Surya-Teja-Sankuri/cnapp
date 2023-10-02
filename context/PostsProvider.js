import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase";

const postContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    console.log("inside post provider");
    try {
      db.collection("posts").onSnapshot(
        (snapshot) => {
          setPosts(
            snapshot.docs.map((post) => {
              return {
                ...post.data(),
                id: post.id,
              };
            })
          );
        },
        (error) => {
          console.log("at post provider ", error);
        }
      );
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
