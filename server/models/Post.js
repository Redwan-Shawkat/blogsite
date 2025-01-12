/** @format */

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
    unique: true,
  },
});

const postModel = mongoose.model("postModel", postSchema);

module.exports = postModel;
