const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
const messages = require("../messages");

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
        .json({ errors: [{ msg: messages.EMAIL_ALREADY_EXISTS }] });
    } else {
      const newUser = new User({
        firstName,
        lastName,
        email: email.toLowerCase(),
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
                  res.json({ msg: messages.USER_REGISTERED, token });
                }
              );
            })
            .catch(err => res.status(500).send(messages.SERVER_ERROR));
        });
      });
    }
  });
};
