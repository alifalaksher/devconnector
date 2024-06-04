const express = require("express");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const Post = require("../../models/Post");
const User = require("../../models/User");

const router = express.Router();

router.post(
  "/",
  [auth, [check("text", "Text is Required").not().isEmpty()]],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(400).json({ errors: error.array() });
    try {
      let user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
      });

      const postSave = await newPost.save();
      return res.json(postSave);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

//@GET Get All Post

router.get("/", auth, async (req, res) => {
  try {
    const allPost = await Post.find().sort({ date: -1 });

    return res.json(allPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error Post" });
  }
});

//Get Post By PostId
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    if (!post) return res.status(404).json({ msg: "No Post Found" });

    res.json(post);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: error, message });
    }
    res.status(500).send("Server Error, Post Does nho Fetch");
  }
});

//Delete Post By PostId and Check the Authentication
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    if (!post) return res.status(404).json({ msg: "No Post Found" });
    //Checking The User Is Authenticated And Owner Of This Post Or Not
    if (post.user.toString() != req.user.id) {
      return res
        .status(401)
        .json({ msg: "User is not Authorized to Delete this Post" });
    }

    await post.removed();
    res.json({ msg: "Post Removed" });
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: error, message });
    }
    res.status(500).send("Server Error, Post Does nho Fetch");
  }
});

//like the post
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Checking The User Is Authenticated And Owner Of This Post Or Not
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post Already Like" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json({ msg: "Post Liked" });
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: error.message });
    }
  }
});

//unlike the post
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);

    //Checking The User Is Authenticated And Owner Of This Post Or Not
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: `Post Not Like ${req.user.name}` });
    }

    // Get remove index

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json({ msg: `${req.user.name} removed from likes` });
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: error.message });
    }
  }
});

//add Comment to the post
router.put("/comment/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.user.id).select("-password");
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });
    const newComment = {
      user: req.user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
    };

    post.comment.unshift(newComment);

    await post.save();
    res.json({ msg: `${req.user.name} Has Added a Comment ${post.comment}` });
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: error.message });
    }
  }
});

//add Comment to the post
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.user.id);

    const comment = post.comment.find(
      (com) => com.id === req.params.comment_id
    );
    //Checking if the user is the owner of the comment
    if (!comment)
      return res
        .status(401)
        .json({ msg: "You are not authorized to perform this action." });
    //Remove the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "You are not authorized" });
    }

    // Get remove index
    const removeIndex = post.comment
      .map((com) => com.user.toString())
      .indexOf(req.user.id);
    post.comment.splice(removeIndex, 1);
    await post.save();
    res.json({ msg: `The comment was deleted successfully.` });
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: error.message });
    }
  }
});

module.exports = router;
