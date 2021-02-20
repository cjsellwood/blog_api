if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");

// Routes
const postsRouter = require("./routes/posts");

// Use local database in development mode
let dbURL = process.env.DB_URL;
if (process.env.NODE_ENV !== "production") {
  dbURL = "mongodb://localhost/blog";
}

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

const app = express();

// middleware
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Custom Routes
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("HOME");
});

// Handle Page not found
app.use("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

// Handle errors
app.use((err, req, res, next) => {
  console.log(err);
  if (!err.statusCode) {
    err.message = "Something went wrong";
    err.statusCode = 500;
  }
  res.status(err.statusCode).render("error", { err });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Port 3000");
});
