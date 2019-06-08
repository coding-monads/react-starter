const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('config');
const User = require('../models/User');

const cfg = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.get('jwtSecret')
};

module.exports = () => {
	passport.use(
		new JwtStrategy(cfg, (jwtPayload, done) => {
			User.findOne({ _id: jwtPayload.user.id })
				.then(user => {
					if (user) {
						return done(null, user);
					}
					return done(null, false);
				})
				.catch(err => err);
		})
	);
};
