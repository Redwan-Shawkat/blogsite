/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/posts");
        setPosts(response.data);
      } catch (e) {
        console.error("Error fetching posts:", e);
      }
    };
    fetchPosts();
  }, []);

  /*
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/posts",
        newPost
      );
      // setPosts([...posts, response.data]);
      setPosts((prevPosts) => [...prevPosts, response.data]);
    } catch (e) {
      console.error("Error adding post:", e);
    }
  };
  */

  const addOrUpdatePost = (newPost) => {
    if (editPost) {
      //update
      const updatedPosts = posts.map((post) =>
        post.title === editPost.title ? newPost : post
      );
      setPosts(updatedPosts);
      setEditPost(null);
    } else {
      //add
      setPosts((prevPosts) => [...prevPosts, newPost]);
    }
  };

  const startEditing = (post) => {
    setEditPost(post);
  };

  return (
    <div>
      <h1> Simple Blog </h1>
      <BlogForm
        onAddPost=/* {addPost} */ {addOrUpdatePost}
        editPost={editPost}
      />
      <BlogList posts={posts} onEdit={startEditing} />
    </div>
  );
};

export default HomePage;
