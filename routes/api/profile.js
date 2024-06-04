const express = require("express");
const request = require("request");
const config = require("config");

const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

//model Required
const User = require("../../models/User");
const Profile = require("../../models/Profile");

//router
const router = express.Router();

//@route Get ('/api/profile/me')
//@des  Get current user profile
//@access Private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.send({ profile });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Profile Server Error" });
  }
});

//profile post

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubUsername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    const profileField = {};
    profileField.user = req.user.id;
    if (company) profileField.company = company;
    if (website) profileField.website = website;
    if (location) profileField.location = location;
    if (bio) profileField.bio = bio;
    if (status) profileField.status = status;
    if (githubUsername) profileField.githubUsername = githubUsername;

    if (skills) {
      profileField.skills = skills.split(",").map((skill) => {
        let updatedSkill = skill.trim().split("");
        updatedSkill.splice(0, 1, updatedSkill[0].toUpperCase());
        return updatedSkill.join("");
      });
    }

    //Build social media field
    profileField.social = {};
    if (youtube) profileField.social.youtube = youtube;
    if (facebook) profileField.social.facebook = facebook;
    if (twitter) profileField.social.twitter = twitter;
    if (linkedin) profileField.social.linkedIn = linkedin;
    if (instagram) profileField.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      //Update Profile
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileField },
          { new: true }
        );
        return res.json(profile);
      }
      //create profile
      profile = new Profile(profileField);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error Profile");
    }
  }
);

//@route Get all profile
//@des  Get
//@access Private

router.get("/", async (req, res) => {
  try {
    const profile = await Profile.find().populate("user", ["name", "avatar"]);
    res.json({ profile });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: `Error ${error.message}` });
  }
  
});
//@route Get profile by user id
//@des  Get
//@access Private

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "No Profile Found" });
    }
    res.json({ profile });
  } catch (error) {
    console.log(error);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: `Error ${error.message}` });
    }
  }
});

//@route Delete Profile and User
//@des  Get
//@access Private

router.delete("/", auth, async (req, res) => {
  try {
    // delete user post

    //Delete Profile
    const profile = await Profile.findOneAndDelete({ user: req.user_id });
    //Delete User
    const user = await User.findOneAndDelete({ _id: req.user_id });

    res.status(200).json({ msg: "Profile has been deleted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: `Error ${error.message}` });
  }
});

//@route Put Add experience
//@des  put
//@access Private

router.put(
  "/exp",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("from", "From to is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;

    const newExp = { title, company, location, from, to, current, description };
    try {
      const getProfileExp = await Profile.findOne({ user: req.user.id });
      if (!getProfileExp) {
        return res.status(400).json({ msg: "Profile does not exist" });
      }
      
      getProfileExp.experience.unshift(newExp);
      await getProfileExp.save();
      res.json(getProfileExp);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: `Error ${error.message}` });
    }
  }
);

//@route Delete Profile and User
//@des  Get
//@access Private

router.delete("/exp/:exp_id", auth, async (req, res) => {
  try {
    // delete user post

    //Delete Profile
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    return res.status(400).json({ msg: `Error ${error.message}` });
  }
});

//@route Put Add education
//@des  put
//@access Private

router.put(
  "/ed",
  [
    auth,
    [
      check("institute", "Institute is required").not().isEmpty(),
      check("from", "From to is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { institute, degree, fieldOfStudy, from, to, current, description } =
      req.body;

    const newEd = {
      institute,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    };
    try {
      const getProfileEd = await Profile.findOne({ user: req.user.id });
      if (!getProfileEd) {
        return res.status(400).json({ msg: "Profile does not exist" });
      }

      getProfileEd.education.unshift(newEd);
      await getProfileEd.save();
      res.json(getProfileEd);
    } catch (error) {
      
      return res.status(400).json({ msg: `Error ${error.message}` });
    }
  }
);

//@route Delete Education
//@des  Delete
//@access Private

router.delete("/ed/:ed_id", auth, async (req, res) => {
  try {
    // delete user post

    //Delete Profile
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.ed_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: `Error ${error.message}` });
  }
});

//@route Get Github UserProfile
//@des  Github Username with profile
//@access Private

router.get("/github/:username", auth, async (req, res) => {
  try {
    const option = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubClientSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(option, (error,response, body)=>{
      if(error){console.log(error)}
      if(response.statusCode !==200){
        return res.send('Please make sure you enter a valid username!')
        }
        res.json(JSON.parse(body));
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: `Error ${error.message}` });
  }
});

module.exports = router;
