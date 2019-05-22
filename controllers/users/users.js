const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

exports.registerUser = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const { firstName, lastName, email, password } = req.body;

  User.findOne({ email: email.toLowerCase() }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email already exists" }] });
    } else {
      const newUser = new User({
        firstName,
        lastName,
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
};
