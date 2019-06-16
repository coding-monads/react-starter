import { validationResult } from "express-validator/check";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import messages from "../messages";
import User from "../../models/User";
import { Response, Request } from "express";
import { isObject } from "util";
import {
  sendVerificationEmail,
  sendResetPasswordEmail
} from "../../services/email/EmailService";

export const activateUser = async (req: Request, res: Response) => {
  const { activationKey } = req.params;
  const user = await User.findOne({ activationKey });
  if (user) {
    if (user.emailVerified) {
      return res.status(400).json({ msg: messages.KEY_HAS_BEEN_ACTIVATED });
    }
    user.emailVerified = true;

    await user.save();
    return res.status(200).json({ msg: messages.USER_ACTIVATED });
  }
  return res.status(400).json({ msg: messages.ACTIVATION_KEY_IS_INCORRECT });
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-_id")
      .select("-password")
      .select("-activationKey")
      .select("-updatedAt")
      .select("-__v");
    res.json({ user });
  } catch (err) {
    res.status(500).send(messages.SERVER_ERROR);
  }
};

export const registerUser = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const { firstName, lastName, email, password } = req.body;

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password),
    activationKey: bcrypt.hashSync(email).replace(/\//g, "")
  });

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
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          sendVerificationEmail(newUser.email, newUser.activationKey);
          res.json({
            msg: messages.USER_REGISTERED,
            token: "Bearer " + token
          });
        }
      );
    })
    .catch(err => {
      if (err.name == "MongoError") {
        console.error("Error Validating!", err);
        res.status(400).send(messages.EMAIL_ALREADY_EXISTS);
      } else {
        console.error(err);
        res.status(500).send(messages.SERVER_ERROR);
      }
    });
};

export const loginUser = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
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
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                msg: messages.USER_LOGGEDIN,
                token: "Bearer " + token
              });
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

class ResetPayload {
  sub: string;
  type: string;

  constructor(sub: string, type: string) {
    this.sub = sub;
    this.type = type;
  }
}

export const resetPassword = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const { email } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: messages.EMAIL_NOT_EXISTS }] });
    } else {
      const payload = new ResetPayload(user.id, "reset");
      jwt.sign(
        Object.assign({}, payload),
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          user.lastResetToken = token;
          user.save();
          sendResetPasswordEmail(user.email, token);
          res.json({
            msg: messages.RESET_PASSWORD_EMAIL_SEND
          });
        }
      );
    }
  });
};

export const updatePasswordVerifyToken = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const { token } = req.params;

  try {
    const decodedToken = <ResetPayload>(
      jwt.verify(token, config.get("jwtSecret"))
    );

    if (isObject(decodedToken)) {
      res.json(decodedToken);
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: messages.TOKEN_IS_INVALID }] });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ errors: [{ msg: messages.TOKEN_IS_INVALID }] });
  }
};

export const updatePassword = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const { token, password } = req.body;
  const decodedToken = <ResetPayload>jwt.verify(token, config.get("jwtSecret"));

  if (isObject(decodedToken)) {
    User.findById(decodedToken.sub).then(user => {
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: messages.USER_NOT_FOUND }] });
      } else {
        if (user.lastResetToken === token) {
          user.lastResetToken = undefined;
          user.password = bcrypt.hashSync(password);
          user.save();
          res.json({
            msg: messages.RESET_PASSWORD_SUCCESSFUL
          });
        } else {
          return res
            .status(400)
            .json({ errors: [{ msg: messages.TOKEN_EXPIRED }] });
        }
      }
    });
  }
};

export const deleteUser = (req: Request, res: Response) => {
  User.findOneAndRemove({ _id: req.user.id })
    .then(() => res.json({ msg: messages.USER_DELETED }))
    .catch(() => res.status(500).send(messages.SERVER_ERROR));
};

export const updateUserData = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }
  const user = await User.findById(req.user.id);
  if (user) {
    const { firstName, lastName, password } = req.body;
    let { email } = req.body;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    if (email) {
      email = email.toLowerCase();
      if (email !== user.email) {
        const emailExist = await User.findOne({ email });
        if (emailExist) {
          return res
            .status(400)
            .json({ errors: [{ msg: messages.EMAIL_ALREADY_EXISTS }] });
        }
        user.email = email;
        user.activationKey = bcrypt.hashSync(email).replace(/\//g, "");
        user.emailVerified = false;
        sendVerificationEmail(user.email, user.activationKey);
      }
    }
    if (password) {
      user.password = bcrypt.hashSync(password);
    }
    await user.save();
    return res.json({ msg: messages.USER_UPDATED });
  } else {
    return res.status(500).send(messages.SERVER_ERROR);
  }
};
