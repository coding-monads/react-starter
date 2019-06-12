import { validationResult } from 'express-validator/check';
import { Response, Request } from 'express';

export default (req: Request, res: Response) => {
	const errors = validationResult(req);
	
	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json({ errors: errors.array({ onlyFirstError: true }) });
	}
}