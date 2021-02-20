const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Comment", commentSchema);
