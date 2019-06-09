import express from 'express';
import passport from 'passport';

import { passportConfig } from './config/passport';
import users from './routes/api/users';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

passportConfig();
// Routes
app.use('/api/users', users);

export { app };
