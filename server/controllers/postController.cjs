/** @format */

const postModel = require("../models/Post");

//Get
const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch posts", e });
  }
};

//Create
const createPost = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title & Content is required" });
  }

  try {
    const newPost = new postModel({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (e) {
    res.status(500).json({ message: "Failed to create post", e });
  }
};

//Update
const updatePost = async (req, res) => {
  const { title } = req.params;
  const { newTitle, newContent } = req.body;

  if (!newTitle && !newContent) {
    return res
      .status(400)
      .json({ message: "New title or content is required" });
  }

  try {
    const updatedPost = await postModel.findOneAndUpdate(
      { title },
      { title: newTitle || title, content: newContent || "" },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (e) {
    res.status(500).json({ message: "Failed to update post", e });
  }
};

module.exports = { getPosts, createPost, updatePost };
