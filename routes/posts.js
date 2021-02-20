const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const posts = require("../controllers/posts");

// Get list of posts
router.get("/", catchAsync(posts.getPosts));

// Get individual post
router.get("/:id", catchAsync(posts.getPost));

module.exports = router;
