import passport from 'passport';
import messages from '../controllers/messages';
import { Response, NextFunction, Request } from 'express';

export const auth = (
	req: Request,
	res: Response,
	next: NextFunction,
	authEmail: boolean = true,
	authAdmin: boolean = false
) => {
	passport.authenticate('jwt', { session: false }, (err, user, info) => {
		if (err) {
			return res.status(500).json({ msg: messages.SERVER_ERROR });
		}
		if (info) {
			return res.status(401).json({
				msg: info.message[0].toUpperCase() + info.message.slice(1)
			});
		}
		if (authEmail) {
			if (!user.emailVerified) {
				return res.status(401).json({ msg: messages.EMAIL_NOT_VERIFIED });
			}
		}
		if (authAdmin){
			if(!user.roles.includes('admin')){
				return res.status(401).json({ msg: "You don't have permission to access" });
			}
			if(req.params.user_id){
				req.user = { id: req.params.user_id }
			}
		} else {
			req.user = user;
		}
		next();
	})(req, res, next, authEmail, authAdmin);
};
