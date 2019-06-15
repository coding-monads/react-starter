import passport from "passport";
import messages from "../controllers/messages";
import { Response, NextFunction, Request } from "express";

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction,
  withEmail: boolean = true
) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ msg: messages.SERVER_ERROR });
    } else if (info) {
      return res.status(401).json({
        msg: info.message[0].toUpperCase() + info.message.slice(1)
      });
    } else if (!user.emailVerified) {
      return res.status(401).json({ msg: messages.EMAIL_NOT_VERIFIED });
    } else if (withEmail && user.emailVerified) {
      req.user = user;
      next();
    }
  })(req, res, next, withEmail);
};
