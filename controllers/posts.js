const Post = require("../models/post");
const Comment = require("../models/comment");

// Get all published posts
module.exports.getPosts = async (req, res, next) => {
  console.log("Responding with all posts");
  const posts = await Post.find({ published: true }).populate("comments");
  res.json(posts);
};

// Post new comment
module.exports.addComment = async (req, res, next) => {
  console.log("Save comment");
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
  res.json({ status: "Success" });
};

// Get one post
module.exports.getPost = async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("comments");
  res.json(post);
};
