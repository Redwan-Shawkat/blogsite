/** @format */

// -----> dotenv
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const URL = process.env.URL;

mongoose
  .connect(URL)
  .then(() => console.log("Database is connected!"))
  .catch((e) => console.log("Database Connection Error: ", e));

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
});

const postModel = mongoose.model("postModel", postSchema);

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({
      message: "Database having problems loading the posts",
      error: e,
    });
  }
});

app.post("/api/posts", async (req, res) => {
  const { title, status } = req.body;
  try {
    const newPost = new postModel({ title, status });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (e) {
    res
      .status(404)
      .json({ message: "Error while creating new post", error: e });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Database is Listening on port: ${PORT}`));
