/** @format */

const express = require("express");
const {
  getPosts,
  createPost,
  updatePost,
} = require("../controllers/postController.cjs");

const router = express.Router();

router.get("/", getPosts);

router.post("/", createPost);

router.put("/:title", updatePost);

module.exports = router;
