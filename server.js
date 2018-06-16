const express = require("express");
const mongoose = require("mongoose");

//establish routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// establish app
const app = express();

//DB Config
const db = require("./config/keys").mongoURI;

// Connect mongoose to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello world"));

// Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// server port listening
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
