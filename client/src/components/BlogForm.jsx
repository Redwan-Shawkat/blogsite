/** @format */

import { useState, useEffect } from "react";

const BlogForm = (/* { onAddPost } */ { onAddPost, editPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setContent(editPost.content);
    }
  }, [editPost]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill in both fields first");
      return;
    }
    onAddPost({ title: title, content: content });
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Blog Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!editPost}
        />
        <br />
        <br />
        <textarea
          placeholder='Blog Content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <br />
        <button type='submit'> {editPost ? "Update Post" : "Add Post"} </button>
      </form>
    </div>
  );
};

export default BlogForm;
