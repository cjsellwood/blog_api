const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const posts = require("../controllers/posts");

// Get list of posts
router.get("/", catchAsync(posts.getPosts));

// Post new comment
router.post("/:id/comment", catchAsync(posts.addComment));

// Get individual post
router.get("/:id", catchAsync(posts.getPost));

module.exports = router;
