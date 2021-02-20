const Post = require("../models/post")

module.exports.getPosts = async(req, res, next) => {
  const posts = await Post.find({}).populate("comments");
  res.json(posts)
}