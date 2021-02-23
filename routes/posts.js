const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const posts = require("../controllers/posts");
const passport = require("passport");

// Login
router.post("/login", catchAsync(posts.login));

// Get list of published posts
router.get("/", catchAsync(posts.getPosts));

// Post new blog post
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  catchAsync(posts.addPost)
);

// Get list of all posts
router.get("/all", catchAsync(posts.getAllPosts));

// Post new comment
router.post("/:id/comment", catchAsync(posts.addComment));

// Delete comment
router.delete(
  "/:id/comment/:commentId",
  passport.authenticate("jwt", { session: false }),
  catchAsync(posts.deleteComment)
);

// Change published status
router.patch(
  "/:id/publish",
  passport.authenticate("jwt", { session: false }),
  catchAsync(posts.published)
);

// Delete individual post
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  catchAsync(posts.deletePost)
);

// Get individual post
router.get("/:id", catchAsync(posts.getPost));

// Edit post
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  catchAsync(posts.editPost)
);

module.exports = router;
