import passport from "passport";
import messages from "../controllers/messages";
import { Response, NextFunction, Request } from "express";
import { RequestHandler } from "express-serve-static-core";

export default (
  req: Request,
  res: Response,
  next: NextFunction,
  withEmail = true
) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ msg: messages.SERVER_ERROR });
    }
    if (info) {
      return res.status(401).json({
        msg: info.message[0].toUpperCase() + info.message.slice(1)
      });
    }
    if (!user.emailVerified) {
      return res.status(401).json({ msg: messages.EMAIL_NOT_VERIFIED });
    }
    req.user = user;
    next();
  })(req, res, next, withEmail);
};
