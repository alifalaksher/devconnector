const express = require("express");
const router = express.Router();
// Auth Token
const auth = require("../../middleware/auth");
const User = require("../../models/User");

const { check, validationResult } = require("express-validator");

const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json({ user });
  } catch (error) {
    throw error.message;
    res.status(500).send("server Error");
  }
});

//login user
router.post(
  "/",
  [
    check("email", "please enter the valid mail").isEmail(),
    check("password", "Enter Valid Password").exists(),
  ],
  async (req, res) => {
    // Finds the error from a single field.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    //see if user Created
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ error: [{ msg: "Invalid Credentials" }] });
      }

      const IsMatch = await bcrypt.compare(password, user.password);
      if (!IsMatch) {
        return res
          .status(400)
          .json({ error: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwt"),
        { expiresIn: 3600 },
        (error, token) => {
          if (error) throw error.message("Does not login");
          console.log("Signed JWT");
          res.json({ token });
        }
      );
    } catch (errors) {
      console.error(errors.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
