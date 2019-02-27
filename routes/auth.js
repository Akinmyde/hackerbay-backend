import express from 'express';
import signUp from '../controllers';
import middlewares from '../middlewares';

const authRoute = express.Router();

authRoute.post('/', middlewares.validateUserSignup, signUp);

export default authRoute;
