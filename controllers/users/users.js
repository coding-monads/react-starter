const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
const messages = require("../messages");
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendVerificationEmail = user => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }
  })

  const mailOptions = {
    from: "natripareact <natripareact@gmail.com>",
    to: user.email,
    subject: "Account Activation",
    html: `
      To activate your account, click this link
      <a href="http://localhost:5000/api/users/activate/${user.activationKey}">Activate Account</a>
    `
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if(err) throw err;
  })
}

exports.activateUser = async (req, res) => {
  const { activationKey } = req.params;
  await User.findOneAndUpdate({ activationKey }, { emailVerified: true })
  .then(() => {
    res.status(200).json({ msg: messages.USER_ACTIVATED });
  })
  .catch(() => {
    res.status(400).json({ msg: messages.SERVER_ERROR });
  });
}

exports.registerUser = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const { firstName, lastName, email, password } = req.body;

  User.findOne({ email: email.toLowerCase() }).then(async (user) => {
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

      await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.email, salt, (err, hash) => {
          if (err) throw err;
          newUser.activationKey = hash 
        });
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
                  sendVerificationEmail(newUser);
                  res.json({
                    msg: messages.USER_REGISTERED,
                    token
                  });
                }
              );
            })
            .catch(err => res.status(500).send(messages.SERVER_ERROR));
        });
      });
    }
  });
};

exports.loginUser = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }
  const { password, email } = req.body;

  User.findOne({ email: email.toLowerCase() }).then(user => {
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: messages.INVALID_CREDENTIALS }] });
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
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
              res.json({ msg: messages.USER_LOGGEDIN, token });
            }
          );
        } else {
          return res
            .status(400)
            .json({ errors: [{ msg: messages.INVALID_CREDENTIALS }] });
        }
      });
    }
  });
};

exports.deleteUser = (req, res) => {
  User.findOneAndRemove({ _id: req.user.id })
    .then(() => res.json({ msg: messages.USER_DELETED }))
    .catch(err => res.status(500).send(messages.SERVER_ERROR));
};
