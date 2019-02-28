import express from 'express';
import { patch } from '../controllers';
import middlewares from '../middlewares';

const { isLogin, validatePatchInput } = middlewares;
const authRoute = express.Router();

authRoute.post('/patch', isLogin, validatePatchInput, patch);

export default authRoute;
