import passport from 'passport';
import messages from '../controllers/messages';
import { Response, NextFunction, Request } from 'express';
import roles from '../controllers/adminRoles';

export const auth = ({
	authEmail = true, authAdmin = false}: 
	{authEmail?: boolean, authAdmin?: boolean 
}) => (
	req: Request,
	res: Response,
	next: NextFunction,	
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
			if(!user.roles.includes(roles.ADMIN)){
				return res.status(401).json({ msg: messages.NO_PERMISSION });
			}
			if(req.params.user_id){
				req.user = { id: req.params.user_id, admin: true }
			}
		} else {
			req.user = user;
		}
		next();
	})(req, res, next, authEmail, authAdmin);
};
