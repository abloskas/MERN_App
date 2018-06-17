const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//post model
const Post = require("../../models/Post");
//profile model for delete post
const Profile = require("../../models/Profile");

//validation
const validatePostInput = require("../../validations/post");

// @route  GET api/posts/test
// @desc   Tests post route
// @access Public route
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

// @route  Get api/posts
// @desc   Get post
// @access Public route
router.get("/", (req, res) => {
  Post.find({})
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No Posts found" }));
});

// @route  Get api/posts/:id
// @desc   Get post bu id
// @access Public route
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No Post Found with that ID" })
    );
});

// @route  Post api/posts
// @desc   Create post
// @access Private route
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      //if any errors, send 400 w/ errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route  DELETE api/posts/:id
// @desc   delete post by id
// @access Private route
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized!" });
          }
          post.remove().then(() => {
            res.json({ success: true });
          });
        })
        .catch(err => res.status(404).json({ postnotfound: "No Post found" }));
    });
  }
);

module.exports = router;
