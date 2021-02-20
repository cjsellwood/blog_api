const mongoose = require("mongoose");
const Comment = require("./comment");
const Schema = mongoose.Schema;

const postSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
    default: false,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: Comment,
    },
  ],
});

module.exports = new mongoose.model("Post", postSchema);
