import bcrypt from "bcryptjs";
import config from "config";
import messages from "../messages";
import User from "../../models/User";
import { Response, Request } from "express";
import signJwtToken from "../signJwtToken";
import jwt from 'jsonwebtoken';

import { isObject } from "util";
import {
  SendMessageService,
  SendMessageServiceImpl
} from "../../services/SendMessageService";

const sendMessageService: SendMessageService = new SendMessageServiceImpl(
  config.get("mail.settings"),
  config.get("mail.credentials")
);

export const activateUser = async (req: Request, res: Response) => {
  const { activationKey } = req.params;
  try {
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
  } catch {
    res.status(500).send(messages.SERVER_ERROR);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-_id")
      .select("-password")
      .select("-activationKey")
      .select("-updatedAt")
      .select("-__v");
    if (user) {
      return res.json({ user });
    }
    return res.json({ msg: messages.USER_NOT_FOUND });
  } catch {
    return res.status(500).send(messages.SERVER_ERROR);
  }
};

export const getUserList = async (req: Request, res: Response) => {
  try {
    const userList = await User.find()
      .select("-password")
      .select("-activationKey")
      .select("-updatedAt")
      .select("-__v");
    if (userList) {
      return res.json({ userList });
    }
    return res.json({ msg: messages.USERS_NOT_FOUND });
  } catch {
    return res.status(500).send(messages.SERVER_ERROR);
  }
};

export const addUser = async (req: Request, res: Response) => {
  const {
    // @ts-ignore
    email = email.toLowerCase(),
    password
  } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: messages.EMAIL_ALREADY_EXISTS }] });
    } else {
      const newUser = new User(req.body);
      newUser.email = email;
      newUser.password = bcrypt.hashSync(password);

      await newUser.save();
      return res.json({ msg: messages.USER_ADDED });
    }
  } catch (err) {
    return res.status(500).send(messages.SERVER_ERROR);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: messages.EMAIL_ALREADY_EXISTS }] });
    } else {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password),
        activationKey: bcrypt.hashSync(email).replace(/\//g, "")
      });

      const user = await newUser.save();
      sendMessageService.sendMessage({
        email: newUser.email,
        activationKey: newUser.activationKey
      });
      signJwtToken(res, user, 3600, messages.USER_REGISTERED);
    }
  } catch {
    return res.status(500).send(messages.SERVER_ERROR);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const {
    password,
    // @ts-ignore
    email = email.toLowerCase(),
    remember
  } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: messages.INVALID_CREDENTIALS }] });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const expiresIn = remember ? 43200 : 3600;
        signJwtToken(res, user, expiresIn, messages.USER_LOGGEDIN);
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: messages.INVALID_CREDENTIALS }] });
      }
    }
  } catch {
    return res.status(500).send(messages.SERVER_ERROR);
  }
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

          sendMessageService.sendMessage({
            email: user.email,
            resetKey: token
          });

          res.json({
            msg: messages.RESET_PASSWORD_EMAIL_SEND
          });
        }
      );
    }
  });
};

export const updatePasswordVerifyToken = (req: Request, res: Response) => {
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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.user.id });
    if (user) {
      return res.json({ msg: messages.USER_DELETED });
    }
    return res.json({ msg: messages.USERS_NOT_FOUND });
  } catch {
    return res.status(500).send(messages.SERVER_ERROR);
  }
};

export const updateUserData = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      const { firstName, lastName, password, emailVerified, roles } = req.body;
      let { email } = req.body;

      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;

      if (req.user.admin) {
        if (emailVerified) user.emailVerified = emailVerified;
        if (roles) user.roles = roles;
      }

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
          if (!req.user.admin) {
            user.activationKey = bcrypt.hashSync(email).replace(/\//g, "");
            user.emailVerified = false;
            sendVerificationEmail(user);
          }
        }
      }
      if (password) {
        user.password = bcrypt.hashSync(password);
      }
      await user.save();
      return res.json({ msg: messages.USER_UPDATED });
    }
    return res.json({ msg: messages.USER_NOT_FOUND });
  } catch {
    return res.status(500).send(messages.SERVER_ERROR);
  }
};
