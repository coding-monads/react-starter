import jwt from 'jsonwebtoken';
import config from 'config';
import { Response } from 'express';
import { IUser } from '../models/User';


export default  (res: Response, user: IUser, expiresIn: number, message: string) => {
    const payload = {
        user: {
            id: user.id
        }
    };
    jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn },
        (err, token) => {
            if (err) throw err;
             res.json({
                msg: message,
                token: 'Bearer ' + token
            });
        }
    );
}
