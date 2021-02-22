const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const posts = require("../controllers/posts");

// Get list of published posts
router.get("/", catchAsync(posts.getPosts));

// Post new blog post
router.post("/", catchAsync(posts.addPost));

// Get list of all posts
router.get("/all", catchAsync(posts.getAllPosts));

// Post new comment
router.post("/:id/comment", catchAsync(posts.addComment));

// Change published status
router.patch("/:id/publish", catchAsync(posts.published));

// Delete individual post
router.delete("/:id", catchAsync(posts.deletePost));

// Get individual post
router.get("/:id", catchAsync(posts.getPost));

module.exports = router;
