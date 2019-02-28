import express from 'express';
import { signUp, login } from '../controllers';
import middlewares from '../middlewares';

const authRoute = express.Router();

authRoute.post('/signup', middlewares.validateUserInput, signUp);
authRoute.post('/login', middlewares.validateUserInput, login);

export default authRoute;
