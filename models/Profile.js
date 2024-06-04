const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubUsername: {
    type: String
  },

  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
        default: Date.now()
      },
      current: {
        type: Boolean,
      },
      description: {
        type: String,
      },
    },
  ],

  education: [
    {
      institute: {
        type: String,
        required: true
      },
      degree: {
        type: String,
      },
      fieldOfStudy: {
        type: String,
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
      },
      description: {
        type: String,
      },
    },
  ],

  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now()
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema)
