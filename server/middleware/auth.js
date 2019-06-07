const passport = require("passport");
const messages = require("../controllers/messages");

module.exports = (req, res, next, withEmail = true) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ msg: messages.SERVER_ERROR });
    }
    if (info) {
      return res.status(401).json({
        msg: info.message[0].toUpperCase() + info.message.slice(1)
      });
    }
    if(withEmail){
      if (!user.emailVerified) {
        return res.status(401).json({ msg: messages.EMAIL_NOT_VERIFIED });
      }
    }
    req.user = user;
    next();
  })(req, res, next, withEmail);
};
