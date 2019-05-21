const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post(
  "/register",
  [
    check("name", "Name field is required")
      .not()
      .isEmpty(),
    check("name", "Plese enter a name between 2 and 30 characters").isLength({
      min: 2,
      max: 30
    }),
    check("email", "Email field is required")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password field is required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Plese enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array({ onlyFirstError: true }) });
    }
    const { name, password, email } = req.body;

    User.findOne({ email: email.toLowerCase() }).then(user => {
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already exists" }] });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Store hash in your password DB.
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = {
                  user: {
                    id: user.id
                  }
                };

                jwt.sign(
                  payload,
                  config.get("jwtSecret"),
                  {
                    expiresIn: 3600
                  },
                  (err, token) => {
                    if (err) throw err;
                    res.json({ msg: "User registered", token });
                  }
                );
              })
              .catch(err => res.status(500).send("Server error"));
          });
        });
      }
    });
  }
);

module.exports = router;
