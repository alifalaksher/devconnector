const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const config = require('config')
const gravatar = require('gravatar')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");


router.post(
  "/",
  [
    check("name", "please enter the name").not().isEmpty(),
    check("email", "please enter the valid mail").isEmail(),
    check("password", "Enter Password with 6 min Charactar").isLength(6),
  ],
  async (req, res) => {
    // Finds the error from a single field.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    //see if user Created
    try {
      let user = await User.findOne({ email });

      if (user) {
       return res.status(400).json({ error: [{ msg: "User Already Exit" }] });
      }

      //get user gravatar

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

       user = new User({
        name,
        email,
        password,
        avatar,
      });

      //Encrypt

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //return jsonwebtoken

      const payload = {
        user:{
            id: user.id
        }
      }

      jwt.sign(payload, config.get("jwt"),{expiresIn: 360000}, (error, token)=>{
        if(error) throw error.message("Does not login");
        console.log('Signed JWT')
        res.json({token});
      } )
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
