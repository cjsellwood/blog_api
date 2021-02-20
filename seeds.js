const mongoose = require("mongoose");
const Post = require("./models/post");
const Comment = require("./models/comment");

const dbURL = "mongodb://localhost/blog";

// Connect to database
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Connected to mongo");
});

const seedComments = async () => {
  await Comment.deleteMany({});

  for (let i = 0; i < 100; i++) {
    const comment = new Comment({
      text:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore quisquam praesentium suscipit ullam voluptatum ea!",
      date: Date.now() + i * 100000000,
      username: `User ${i}`,
    });
    await comment.save();
  }
};

const seedPosts = async () => {
  await Post.deleteMany({});
  const comments = await Comment.find({});

  for (let i = 0; i < 20; i++) {
    const post = new Post({
      title: `Title ${i}`,
      text:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore quisquam praesentium suscipit ullam voluptatum ea! Rerum facere in omnis earum. Modi quas voluptatibus provident laudantium deserunt adipisci quidem mollitia cumque! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore quisquam praesentium suscipit ullam voluptatum ea! Rerum facere in omnis earum. Modi quas voluptatibus provident laudantium deserunt adipisci quidem mollitia cumque! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore quisquam praesentium suscipit ullam voluptatum ea! Rerum facere in omnis earum. Modi quas voluptatibus provident laudantium deserunt adipisci quidem mollitia cumque! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore quisquam praesentium suscipit ullam voluptatum ea! Rerum facere in omnis earum. Modi quas voluptatibus provident laudantium deserunt adipisci quidem mollitia cumque! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore quisquam praesentium suscipit ullam voluptatum ea! Rerum facere in omnis earum. Modi quas voluptatibus provident laudantium deserunt adipisci quidem mollitia cumque!",
      published: Math.random() > 0.5,
      date: Date.now() + i * 100000000,
      comments: comments.slice(i * 5, (i + 1) * 5),
    });
    await post.save();
  }
};

const runAll = async () => {
  await seedComments();
  await seedPosts();
  mongoose.disconnect();
}

runAll();
