const passport = require("passport");
const messages = require("../controllers/messages");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ msg: messages.SERVER_ERROR });
    }
    if (info !== undefined) {
      if (info.message === "No auth token") {
        return res
          .status(401)
          .json({ msg: messages.NO_TOKEN_AUTHORIZATION_DENIED });
      } else if (
        info.message === "invalid signature" ||
        info.message === "jwt malformed"
      ) {
        return res.status(401).json({ msg: messages.TOKEN_IS_INVALID });
      } else if (info.message === "jwt expired") {
        return res.status(401).json({ msg: messages.TOKEN_EXPIRED });
      }
    }
    if (!user.emailVerified) {
      return res.status(401).json({ msg: messages.EMAIL_NOT_VERIFIED });
    }
    req.user = user;
    next();
  })(req, res, next);
};
