import express from 'express';
import authRoute from './authRoute';
import thumbnailRoute from './thumbnailRoute';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/', thumbnailRoute);

export default router;
