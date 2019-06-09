import passport from 'passport';
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';

import config from 'config';
import User from '../models/User';

const cfg: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.get('jwtSecret')
};

export const passportConfig = () => {
	passport.use(
		new Strategy(cfg, (jwtPayload, done) => {
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
