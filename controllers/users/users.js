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
      <a href="http://localhost:5000/api/users/activate/${user._id}/${user.activationKey}">Activate Account</a>
    `
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if(err) throw err;
  })
}

exports.activateUser = async (req, res) => {
  const { userId, activationKey } = req.params;
  await User.findOneAndUpdate({ _id: userId, activationKey }, { emailVerified: true })
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
          newUser.activationKey = Math.floor(Math.random()*10000000);
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
