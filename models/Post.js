const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  comment: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  }
});


module.exports = Post = mongoose.model("post", PostSchema);

