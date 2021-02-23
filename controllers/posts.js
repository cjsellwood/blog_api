if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user")
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")

// Login user
module.exports.login = async (req, res, next) => {
  let { username, password } = req.body;

  // Change to database after
  const user = await User.findOne({ username });

  // Check password with bcrypt
  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    // Expires in 24 hours
    const optsJwt = {};
    optsJwt.expiresIn = 60 * 60 * 24;
    // Change to .env later
    const secret = process.env.SECRET;
    const token = jwt.sign({ username }, secret, optsJwt);
    return res.status(200).json({
      message: "Auth Passed",
      token,
      expires: optsJwt.expiresIn,
    });
  }
  return res.status(401).json({ message: "Auth Failed" });
};

// Get all published posts
module.exports.getPosts = async (req, res, next) => {
  const posts = await Post.find({ published: true }).populate("comments");
  res.json(posts);
};

// Get all posts
module.exports.getAllPosts = async (req, res, next) => {
  const posts = await Post.find({}).populate("comments");
  res.json(posts);
};

// Post new comment
module.exports.addComment = async (req, res, next) => {
  // Create new comment and save
  const comment = new Comment({
    ...req.body,
    date: Date.now(),
  });
  await comment.save();

  // Add comment to post comments array
  const post = await Post.findById(req.params.id);
  const newComments = [...post.comments, comment._id];

  await Post.findByIdAndUpdate(req.params.id, {
    comments: newComments,
  });
  res.json({ status: "Success", comment });
};

// Change publish status
module.exports.published = async (req, res, next) => {
  console.log(req.body);
  const { id, published } = req.body;
  const post = await Post.findByIdAndUpdate(
    id,
    { published: !published },
    { new: true }
  ).populate("comments");

  return res.json({ status: "Success", post });
};

// Get one post
module.exports.getPost = async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("comments");
  res.json(post);
};

// Add one post
module.exports.addPost = async (req, res, next) => {
  const post = new Post({
    ...req.body,
    date: Date.now(),
    comments: [],
  });
  const newPost = await post.save();
  res.json({ status: "Success", newPost });
};

// Delete one post
module.exports.deletePost = async (req, res, next) => {
  await Post.findByIdAndDelete(req.body.id);
  res.json({ status: "Success" });
};

// Edit post
module.exports.editPost = async (req, res, next) => {
  const { id, title, text, published } = req.body;
  const editedPost = await Post.findByIdAndUpdate(
    id,
    { title, text, published },
    { new: true }
  ).populate("comments");
  res.json({ status: "Success", editedPost });
};

// Delete comment
module.exports.deleteComment = async (req, res, next) => {
  const { id, commentId } = req.params;
  await Comment.findByIdAndDelete(commentId);
  await Post.findByIdAndUpdate(id, { $pull: { comments: { _id: commentId } } });

  res.json({ status: "Success" });
};
