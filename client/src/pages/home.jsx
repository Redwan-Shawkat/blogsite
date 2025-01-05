/** @format */

import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (e) {
        console.error("Error fetching the data", e);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(title, status);
    try {
      const response = await axios.post("http://localhost:5000/api/posts", {
        title,
        status,
      });
      setPosts([...posts, response.data]);
      setTitle("");
      setStatus("");
    } catch (e) {
      console.error("Error creating post", e);
    }
  };

  // const posts = [
  //   { title: "my first post", status: "this is my first post" },
  //   { title: "my second post", status: "this is my second post" },
  // ];

  return (
    <div className='container'>
      <form className='form-container' onSubmit={handleSubmit}>
        <hr />
        <br />
        <input
          type='text'
          className='dtitle'
          id='title'
          placeholder='Enter Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /> <br />
        <input
          type='text'
          className='dstatus'
          id='status'
          placeholder='Whats on your mind?'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <br /> <br />
        <button className='btm' type='submit'>
          {" "}
          Post{" "}
        </button>
        <br />
        <br />
      </form>
      <hr />
      <br />
      <div className='post-container'>
        {posts.map((post, index) => (
          <div className='posts' key={index}>
            <span> {post.title} -</span>
            <span> {post.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
