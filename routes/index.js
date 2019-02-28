import express from 'express';
import authRoute from './authRoute';
import thumbnailRoute from './thumbnailRoute';
import patchRoute from './patchRoute';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/', thumbnailRoute);
router.use('/', patchRoute);

export default router;
