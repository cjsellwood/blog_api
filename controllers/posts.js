const Post = require("../models/post")

// Get all published posts
module.exports.getPosts = async(req, res, next) => {
  console.log("Responding with all posts")
  const posts = await Post.find({published: true}).populate("comments");
  res.json(posts);
}


// Get one post
module.exports.getPost = async(req, res, next) => {
  const post = await Post.findById(req.params.id).populate("comments");
  res.json(post);
}