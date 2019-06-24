import { validationResult } from 'express-validator/check';
import { Response, Request, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	
	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json({ errors: errors.array({ onlyFirstError: true }) });
	} 
	next();
}