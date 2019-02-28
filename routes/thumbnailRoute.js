import express from 'express';
import { thumbnail } from '../controllers';
import middlewares from '../middlewares';

const { isLogin, validateImageUrl } = middlewares;
const authRoute = express.Router();

authRoute.post('/thumbnail', isLogin, validateImageUrl, thumbnail);

export default authRoute;
